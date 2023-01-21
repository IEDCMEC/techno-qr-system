const QRCode = require("qrcode");
const { createCanvas, loadImage } = require("canvas");

export default async function generateQR(req, res) {
  const center_image = "images/download.png";
  const { string } = req.body;

  const width = 325; // To align the image in the center
  const cwidth = 75; // To increse the Quality of the image (Size)
  try {
    const canvas = createCanvas(width, width);
    QRCode.toCanvas(canvas, string, {
      scale: 11,
    });

    const ctx = canvas.getContext("2d");
    const img = await loadImage(center_image);
    const center = (width - cwidth) / 2 + 15;
    ctx.drawImage(img, center, center, cwidth, cwidth);

    const imageData = canvas.toDataURL("image/png").split(",")[1];
    res.setHeader("Content-Type", "image/png");
    res.send(Buffer.from(imageData, "base64"));
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

// const filePath = "qrCodes/" + Math.random() + "qr.png";

// const dataUri = canvas.toDataURL();
// const base64Data = dataUri.split(";base64,").pop();
// console.log(base64Data);

// const buffer = Buffer.from(base64Data, "base64");
// buffer.stre;
// // return as resonse
// fs.writeFileSync(filePath, buffer);

// convertDataUriToImage(canvas.toDataURL("image/png"), filePath);
// res
//   .status(200)
//   .json({ message: "QR Code has been Successfully generated" });
