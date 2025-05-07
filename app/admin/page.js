"use client";

import { useForm } from "react-hook-form";
import axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";

function Card({ details }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <Image
        height={100}
        width={100}
        src={details.thumbnail}
        alt="Card Image"
        className="w-full"
      />
      <div className="px-6 py-4">
        <p className="font-bold text-xl mb-2">{details.name}</p>
      </div>
    </div>
  );
}
const UploadModel = () => {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();
  const [data, setData] = useState([]);

  const onSubmit = async ({ name, isPublished, thumbnail, _3dmodel }) => {
    const formData = new FormData();
    // console.log(thumbnail[0]);
    // return;
    formData.append("data", JSON.stringify({ name, isPublished }));
    formData.append("thumbnail", thumbnail[0]);
    formData.append("_3dmodel", _3dmodel[0]);
    try {
      const response = await axios.post("/api/3dmodels", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 201) {
        console.log("Data saved successfully");
        console.log(response.data.savedData);
        setData((prev) => [...prev, response.data.savedData]);
      } else {
        console.error("Failed to save data:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  async function getData() {
    const data = await axios.get("/api/3dmodels");

    setData(data.data);
    console.log(data.data);
  }
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <form className="flex flex-col m-4" onSubmit={handleSubmit(onSubmit)}>
        <label>Name:</label>
        <input {...register("name", { required: "Name is required" })} />
        {errors.name && <p>{errors.name.message}</p>}

        <label>Publish:</label>
        <input
          type="checkbox"
          {...register("isPublished", {
            required: "Publish status is required",
          })}
        />
        {errors.isPublished && <p>{errors.name.message}</p>}

        <label>Thumbnail:</label>
        <input
          type="file"
          {...register("thumbnail", { required: "Thumbnail is required" })}
        />
        {errors.thumbnail && <p>{errors.thumbnail.message}</p>}

        <input
          type="file"
          {...register("_3dmodel", { required: "_3dmodel is required" })}
        />
        {errors._3dmodel && <p>{errors._3dmodel.message}</p>}

        <button type="submit">Submit</button>
      </form>
      {data.map((item) => (
        <Card key={item._id} details={item} />
      ))}
    </div>
  );
};

export default UploadModel;
