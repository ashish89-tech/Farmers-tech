import React, { useCallback } from "react";
import { useForm } from "react-hook-form";
import { RTE } from "..";
import appwriteService from "../../appwrite/config";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Upload, FileText } from "lucide-react";
import "./PostForm.css";

export default function PostForm({ post }) {
  const { register, handleSubmit, watch, setValue, control, getValues } =
    useForm({
      defaultValues: {
        title:    post?.title    || "",
        slug:     post?.$id     || "",
        content:  post?.content  || "",
        status:   post?.status   || "active",
        farmName: post?.farmName || "",
        price:    post?.price    || "",
        category: post?.category || "",
      },
    });

  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.userData);

  const submit = async (data) => {
    if (post) {
      const file = data.image[0]
        ? await appwriteService.uploadFile(data.image[0])
        : null;
      if (file) appwriteService.deleteFile(post.feturedImage);

      const dbPost = await appwriteService.updatePost(post.$id, {
        ...data,
        feturedImage: file ? file.$id : post.feturedImage,
      });
      if (dbPost) navigate(`/post/${dbPost.$id}`);

    } else {
      if (!data.image[0]) return;
      const file = await appwriteService.uploadFile(data.image[0]);
      if (!file) return;

      const dbPost = await appwriteService.createPost({
        ...data,
        feturedImage: file.$id,
        userId: userData.$id,
      });
      if (dbPost) navigate(`/post/${dbPost.$id}`);
    }
  };

  const slugTransform = useCallback((value) => {
    if (value && typeof value === "string")
      return value.trim().toLowerCase()
        .replace(/[^a-zA-Z\d\s]+/g, "-")
        .replace(/\s/g, "-");
    return "";
  }, []);

  React.useEffect(() => {
    const subscription = watch((value, { name }) => {
      if (name === "title") {
        setValue("slug", slugTransform(value.title), { shouldValidate: true });
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, slugTransform, setValue]);

  return (
    <div className="pf-root">

      {/* ── Hero ── */}
      <div className="pf-hero">
        <div className="pf-eyebrow">
          <span className="pf-eyebrow-dot" />
          {post ? "Edit Listing" : "New Listing"}
        </div>
        <h1 className="pf-hero-title">
          {post ? <>Update Your <span>Product</span></> : <>List Your <span>Produce</span></>}
        </h1>
        <p className="pf-hero-sub">
          {post
            ? "Update the details of your existing farm listing"
            : "Fill in the details below to add your product to the marketplace"}
        </p>
      </div>

      {/* ── Form ── */}
      <div className="pf-body">
        <div className="pf-card">
          <form onSubmit={handleSubmit(submit)}>
            <div className="pf-grid">

              {/* ── Left column ── */}
              <div>
                <div className="pf-section">Product Details</div>

                <div className="pf-field">
                  <label className="pf-label">Title <span>*</span></label>
                  <input
                    className="pf-input"
                    placeholder="e.g. Fresh Alphonso Mangoes"
                    {...register("title", { required: true })}
                  />
                </div>

                <div className="pf-field">
                  <label className="pf-label">Slug <span>*</span></label>
                  <input
                    className="pf-input mono"
                    placeholder="auto-generated-slug"
                    {...register("slug", { required: true })}
                    onInput={(e) =>
                      setValue("slug", slugTransform(e.currentTarget.value), {
                        shouldValidate: true,
                      })
                    }
                  />
                </div>

                <div className="pf-field">
                  <label className="pf-label">Farm Name <span>*</span></label>
                  <input
                    className="pf-input"
                    placeholder="e.g. Berry Good Farms"
                    {...register("farmName", { required: true })}
                  />
                </div>

                <div className="pf-field">
                  <label className="pf-label">Price (₹) <span>*</span></label>
                  <input
                    className="pf-input"
                    placeholder="e.g. 499"
                    type="number"
                    {...register("price", { required: true })}
                  />
                </div>

                <div className="pf-field">
                  <label className="pf-label">Category <span>*</span></label>
                  <div className="pf-select-wrap">
                    <select
                      className="pf-select"
                      {...register("category", { required: true })}
                    >
                      <option value="">Select a category</option>
                      <option value="fruit">🍎 Fruits</option>
                      <option value="vegetable">🥦 Vegetables</option>
                      <option value="cereal">🌾 Cereals</option>
                      <option value="seed">🫘 Seeds</option>
                      <option value="plant">🪴 Plants</option>
                      <option value="spice">🌶️ Spices</option>
                    </select>
                  </div>
                </div>

                <div className="pf-field">
                  <label className="pf-label">Description <span>*</span></label>
                  <div className="pf-rte-wrap">
                    <RTE
                      name="content"
                      control={control}
                      defaultValue={getValues("content")}
                    />
                  </div>
                </div>
              </div>

              {/* ── Right column ── */}
              <div>
                <div className="pf-section">Image & Status</div>

                <div className="pf-field">
                  <label className="pf-label">
                    Featured Image {!post && <span>*</span>}
                  </label>
                  <input
                    className="pf-input"
                    type="file"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                  />
                </div>

                {post && (
                  <img
                    src={appwriteService.getFilePreview(post.feturedImage)}
                    alt={post.title}
                    className="pf-preview"
                  />
                )}

                <div className="pf-field">
                  <label className="pf-label">Status <span>*</span></label>
                  <div className="pf-select-wrap">
                    <select
                      className="pf-select"
                      {...register("status", { required: true })}
                    >
                      <option value="active">Active</option>
                      <option value="inactive">Inactive</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className={`pf-submit${post ? " update" : ""}`}
                >
                  <FileText size={17} />
                  {post ? "Update Product" : "Publish Listing"}
                </button>
              </div>

            </div>
          </form>
        </div>
      </div>
    </div>
  );
}