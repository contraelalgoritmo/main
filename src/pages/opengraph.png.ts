import type { APIRoute } from "astro";
import satori from "satori";
import { Resvg } from "@resvg/resvg-js";
import { promises as fs } from "fs";
import path from "path";

export const GET: APIRoute = async () => {
  const root = process.cwd();
  const [ramonaBold, ramonaLight, logoSvg] = await Promise.all([
    fs.readFile(path.join(root, "public/fonts/Ramona-Bold.ttf")),
    fs.readFile(path.join(root, "public/fonts/Ramona-Light.ttf")),
    fs.readFile(path.join(root, "src/icons/logo.svg")),
  ]);

  const logoResvg = new Resvg(logoSvg, { fitTo: { mode: "height", value: 280 } });
  const logoRendered = logoResvg.render();
  const logoPng = logoRendered.asPng();
  const logoW = logoRendered.width;
  const logoH = logoRendered.height;
  const logoDataUrl = `data:image/png;base64,${logoPng.toString("base64")}`;

  const svg = await satori(
    {
      type: "div",
      props: {
        style: {
          width: "1200px",
          height: "630px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "flex-start",
          backgroundColor: "#fafafa",
          padding: "80px 100px",
          position: "relative",
          fontFamily: "Ramona",
        },
        children: [
          // Accent bar left
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "0",
                left: "0",
                width: "8px",
                height: "100%",
                backgroundColor: "#ffb088",
              },
            },
          },
          // Decorative circle top-right
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                top: "-120px",
                right: "-120px",
                width: "420px",
                height: "420px",
                borderRadius: "50%",
                backgroundColor: "#ffb088",
                opacity: "0.12",
              },
            },
          },
          // Decorative circle bottom-right
          {
            type: "div",
            props: {
              style: {
                position: "absolute",
                bottom: "-80px",
                right: "80px",
                width: "240px",
                height: "240px",
                borderRadius: "50%",
                backgroundColor: "#7d97ba",
                opacity: "0.15",
              },
            },
          },
          // Logo
          {
            type: "img",
            props: {
              src: logoDataUrl,
              width: logoW,
              height: logoH,
              style: {
                width: `${logoW}px`,
                height: `${logoH}px`,
                marginBottom: "24px",
              },
            },
          },
          // Title
          {
            type: "div",
            props: {
              style: {
                fontSize: "44px",
                fontWeight: 700,
                color: "#1a1a2e",
                lineHeight: "1.1",
                marginBottom: "32px",
                maxWidth: "860px",
              },
              children: "Un proyecto autogestionado que nace de una motivación común: recuperar la tecnología y hacerla nuestra.",
            },
          },
          // Subtitle
          {
            type: "div",
            props: {
              style: {
                fontSize: "24px",
                fontWeight: 300,
                color: "#555577",
                maxWidth: "800px",
                lineHeight: "1.5",
              },
              children: "Haz click en el enlace y conoce más acerca de lo que estamos montando.",
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: "Ramona", data: ramonaBold, weight: 700, style: "normal" },
        { name: "Ramona", data: ramonaLight, weight: 300, style: "normal" },
      ],
    }
  );

  const resvg = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } });
  const png = resvg.render().asPng();

  return new Response(png, {
    headers: {
      "Content-Type": "image/png",
      "Cache-Control": "public, max-age=31536000, immutable",
    },
  });
};
