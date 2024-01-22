import { NextResponse } from "next/server";
import connectToDB from "@/dbconfigs/connect";
import ThreeDModels from "@/db_models/3dmodels";
import uploadFileToS3 from "@/utils/fileUploads3";

async function uploadedFileToBuffer(files) {
  const buffers = await Promise.all(
    files.map(async (file) => {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);
      return buffer;
    })
  );

  return buffers;
}

export async function POST(req, res) {
  try {
    await connectToDB();
    const formData = await req.formData();
    console.log(formData.get("data"));
    console.log(formData.get("thumbnail"));
    const files = [formData.get("thumbnail"), formData.get("_3d_model")];
    const buffers = await uploadedFileToBuffer(files);
    const fileToFolder = ["model_thumbnails", "models"];
    const [thumb_url, _3d_model_url] = await Promise.all(
      buffers.map(
        async (buffer, i) =>
          await uploadFileToS3(buffer, { folderName: fileToFolder[i] })
      )
    );

    const { name, isPublished } = JSON.parse(formData.get("data"));
    console.log(name);
    await ThreeDModels.create({
      name,
      size: formData.get("thumbnail").size / 1024, //coverting to KB
      js_file: "path",
      thumbnail: thumb_url,
      _3dmodel: _3d_model_url,
      isPublished,
    });

    return NextResponse.json(
      { message: "Data saved successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error saving data:", error);
    return NextResponse.json({ message: "ERROR: ISE" }, { status: 500 });
  }
}

export async function GET(req) {
  try {
    await connectToDB();
    // Get all the records in the table
    let models = await ThreeDModels.find();
    console.log(models);
    return NextResponse.json([...models], { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: "ERROR: ISE" }, { status: 500 });
  }
}
