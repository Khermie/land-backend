import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Dropdown from "../common/Dropdown";
import FormField from "../common/FormField";
import ImageUploadGrid from "../common/ImageUploadGrid";
import InAppPageHeader from "../common/InAppPageHeader";
import MobileTabBar from "../common/MobileTabBar";
import { LAND_REGIONS, LAND_TYPE_OPTIONS } from "../../constants/lands";
import { useListings } from "../../context/ListingsContext";
import { cn } from "../../utils/cn";

function CheckCircleIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <circle cx="12" cy="12" r="9.5" strokeWidth="1.5" />
      <path d="M8.5 12l2 2 4-4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldCheckIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path d="M12 3l7 3v5c0 5-3.5 8.5-7 10-3.5-1.5-7-5-7-10V6l7-3z" strokeWidth="1.6" strokeLinejoin="round" />
      <path d="M9 12l2 2 4-4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function MapPinIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-current", className)} aria-hidden="true">
      <path d="M12 2a7 7 0 00-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 00-7-7zm0 9.5A2.5 2.5 0 1112 6.5a2.5 2.5 0 010 5z" />
    </svg>
  );
}

function CrosshairIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <circle cx="12" cy="12" r="3" strokeWidth="1.6" />
      <path d="M12 2v3M12 19v3M2 12h3M19 12h3" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

// Ghana regions for the region dropdown — supplements LAND_REGIONS
// (which only lists regions FEATURED_LANDS demo data already covers)
// so a real submission isn't artificially limited to those 4 areas.
const REGION_OPTIONS = [
  ...new Set([
    ...LAND_REGIONS.filter((r) => r !== "All Regions"),
    "Ashanti",
    "Central",
    "Eastern",
    "Western",
    "Volta",
    "Northern",
  ]),
];

const OWNERSHIP_OPTIONS = ["Titled", "Indenture", "Leasehold", "Family Land", "Government Grant"];

const AMENITY_OPTIONS = [
  { id: "road", label: "Road Access" },
  { id: "electricity", label: "Electricity Nearby" },
  { id: "water", label: "Water Available" },
  { id: "drainage", label: "Good Drainage" },
  { id: "flat", label: "Flat Topography" },
  { id: "fenced", label: "Fenced / Walled" },
  { id: "gated", label: "Gated Community" },
  { id: "corner", label: "Corner Piece" },
];

const initialFormState = {
  title: "",
  category: LAND_TYPE_OPTIONS[0],
  description: "",
  region: REGION_OPTIONS[0],
  district: "",
  address: "",
  lat: "",
  lng: "",
  landSize: "",
  price: "",
  buyNowPrice: "",
  ownershipType: OWNERSHIP_OPTIONS[0],
  titleDocRef: "",
};

export default function ListLandForm() {
  const navigate = useNavigate();
  const { addLandListing } = useListings();

  const [formData, setFormData] = useState(initialFormState);
  const [amenities, setAmenities] = useState([]);
  const [images, setImages] = useState([]);
  const [errors, setErrors] = useState({});
  const [locating, setLocating] = useState(false);
  const [submitState, setSubmitState] = useState("idle"); // idle | submitting | saving-draft | success | error
  const [publishedSlug, setPublishedSlug] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function toggleAmenity(id) {
    setAmenities((prev) => (prev.includes(id) ? prev.filter((a) => a !== id) : [...prev, id]));
  }

  function handleUseMyLocation() {
    if (typeof navigator === "undefined" || !navigator.geolocation) {
      setErrors((prev) => ({ ...prev, location: "Location isn't available in this browser." }));
      return;
    }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setFormData((prev) => ({
          ...prev,
          lat: position.coords.latitude.toFixed(4),
          lng: position.coords.longitude.toFixed(4),
        }));
        setLocating(false);
      },
      () => {
        setErrors((prev) => ({ ...prev, location: "Couldn't get your location. Enter coordinates manually." }));
        setLocating(false);
      },
      { timeout: 8000 }
    );
  }

  function validate({ requireCore }) {
    const newErrors = {};
    if (requireCore) {
      if (!formData.title.trim()) newErrors.title = "Land title is required";
      if (!formData.description.trim()) newErrors.description = "Description is required";
      else if (formData.description.trim().length < 20)
        newErrors.description = "Add a bit more detail (at least 20 characters)";
      if (!formData.district.trim()) newErrors.district = "District is required";
      if (!formData.address.trim()) newErrors.address = "Address is required";
      if (!formData.landSize.trim()) newErrors.landSize = "Land size is required";
      if (!formData.price.trim()) newErrors.price = "Price is required";
      else if (Number.isNaN(Number(formData.price)) || Number(formData.price) <= 0)
        newErrors.price = "Enter a valid price";
      if (formData.buyNowPrice && (Number.isNaN(Number(formData.buyNowPrice)) || Number(formData.buyNowPrice) <= 0))
        newErrors.buyNowPrice = "Enter a valid Buy Now price";
      if (
        formData.buyNowPrice &&
        formData.price &&
        Number(formData.buyNowPrice) <= Number(formData.price)
      )
        newErrors.buyNowPrice = "Buy Now price should be higher than the starting price";
      if (images.length === 0) newErrors.images = "Add at least one photo of the land";
    }
    setErrors((prev) => ({ ...prev, location: prev.location, ...newErrors }));
    return Object.keys(newErrors).length === 0;
  }

  function buildRecord(status) {
    return {
      title: formData.title.trim(),
      category: formData.category,
      description: formData.description.trim(),
      region: formData.region,
      district: formData.district.trim(),
      address: formData.address.trim(),
      coordinates:
        formData.lat && formData.lng ? { lat: Number(formData.lat), lng: Number(formData.lng) } : null,
      landSize: formData.landSize.trim(),
      price: formData.price ? Number(formData.price) : null,
      buyNowPrice: formData.buyNowPrice ? Number(formData.buyNowPrice) : null,
      ownershipType: formData.ownershipType,
      titleDocRef: formData.titleDocRef.trim(),
      amenities,
      imageCount: images.length,
      coverImageUrl: images[0]?.url ?? null,
      status,
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate({ requireCore: true })) return;

    setSubmitState("submitting");
    setTimeout(() => {
      try {
        const record = addLandListing(buildRecord("published"), "published");
        setPublishedSlug(record.slug);
        setSubmitState("success");
      } catch {
        setSubmitState("error");
      }
    }, 900);
  }

  function handleSaveDraft() {
    // Drafts only need a title so a listing can be found again later —
    // everything else can stay unfinished.
    if (!formData.title.trim()) {
      setErrors((prev) => ({ ...prev, title: "Give your draft a title so you can find it later" }));
      return;
    }
    setSubmitState("saving-draft");
    setTimeout(() => {
      addLandListing(buildRecord("draft"), "draft");
      setSubmitState("idle");
      navigate("/dashboard");
    }, 600);
  }

  const isBusy = submitState === "submitting" || submitState === "saving-draft";

  if (submitState === "success") {
    return (
      <div className="flex min-h-screen flex-col bg-mist-50">
        <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 text-center">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-forest-100 text-forest-600">
            <CheckCircleIcon className="h-9 w-9" />
          </span>
          <h1 className="mt-5 text-2xl font-bold text-ink-900">Your land is now listed!</h1>
          <p className="mt-2 max-w-sm text-sm text-ink-500">
            "{formData.title}" is live on Explore Land. Buyers can now view it and place bids
            {formData.buyNowPrice ? " or buy it instantly" : ""}.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button as="a" href={`/explore-land/${publishedSlug}`} variant="primary" size="md">
              View Listing
            </Button>
            <Button as="a" href="/dashboard" variant="outline-dark" size="md">
              Back to Dashboard
            </Button>
          </div>
        </div>
        <MobileTabBar active="land" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-mist-50">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 pt-4 pb-8 sm:px-6">
          <InAppPageHeader
            title="List Your Land"
            subtitle="Reach thousands of verified buyers and contractors."
          />

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Basic details */}
            <section className="rounded-2xl border border-ink-900/10 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-ink-900">Basic Details</h2>
              <div className="mt-4 space-y-4">
                <FormField
                  id="title"
                  name="title"
                  label="Land Title"
                  required
                  placeholder="e.g. East Legon Hills — Residential Plot"
                  value={formData.title}
                  onChange={handleChange}
                  error={errors.title}
                />

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink-900">Category</label>
                  <Dropdown
                    label="Category"
                    options={LAND_TYPE_OPTIONS}
                    value={formData.category}
                    onChange={(val) => setFormData((prev) => ({ ...prev, category: val }))}
                    className="w-full"
                  />
                </div>

                <FormField
                  id="description"
                  name="description"
                  label="Land Description"
                  as="textarea"
                  rows={4}
                  required
                  placeholder="Describe the land — size, terrain, nearby landmarks, what makes it a good opportunity…"
                  value={formData.description}
                  onChange={handleChange}
                  error={errors.description}
                  hint={!errors.description ? "Minimum 20 characters." : undefined}
                />
              </div>
            </section>

            {/* Location */}
            <section className="rounded-2xl border border-ink-900/10 bg-white p-5 sm:p-6">
              <h2 className="flex items-center gap-1.5 text-base font-bold text-ink-900">
                <MapPinIcon className="h-4 w-4 text-forest-600" />
                Location
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink-900">Region</label>
                  <Dropdown
                    label="Region"
                    options={REGION_OPTIONS}
                    value={formData.region}
                    onChange={(val) => setFormData((prev) => ({ ...prev, region: val }))}
                    className="w-full"
                  />
                </div>
                <FormField
                  id="district"
                  name="district"
                  label="District"
                  required
                  placeholder="e.g. Ga East Municipal"
                  value={formData.district}
                  onChange={handleChange}
                  error={errors.district}
                />
              </div>

              <FormField
                id="address"
                name="address"
                label="Address"
                required
                placeholder="e.g. East Legon Hills, off Lakeside Estate Road"
                value={formData.address}
                onChange={handleChange}
                error={errors.address}
                className="mt-4"
              />

              <div className="mt-4">
                <div className="mb-1.5 flex items-center justify-between">
                  <label className="text-sm font-semibold text-ink-900">GPS Coordinates</label>
                  <button
                    type="button"
                    onClick={handleUseMyLocation}
                    disabled={locating}
                    className="flex items-center gap-1 text-xs font-semibold text-forest-600 hover:text-forest-700 disabled:opacity-60"
                  >
                    <CrosshairIcon className="h-3.5 w-3.5" />
                    {locating ? "Locating…" : "Use my current location"}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <input
                    type="text"
                    inputMode="decimal"
                    name="lat"
                    placeholder="Latitude, e.g. 5.6510"
                    value={formData.lat}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-ink-900/15 bg-white px-4 py-2.5 text-sm font-medium text-ink-900 placeholder:text-ink-400 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                  />
                  <input
                    type="text"
                    inputMode="decimal"
                    name="lng"
                    placeholder="Longitude, e.g. -0.1620"
                    value={formData.lng}
                    onChange={handleChange}
                    className="w-full rounded-lg border border-ink-900/15 bg-white px-4 py-2.5 text-sm font-medium text-ink-900 placeholder:text-ink-400 focus:border-forest-500 focus:outline-none focus:ring-2 focus:ring-forest-500/20"
                  />
                </div>
                {errors.location && <p className="mt-1.5 text-xs text-red-600">{errors.location}</p>}
                <p className="mt-1.5 text-xs text-ink-500">
                  Optional, but helps buyers find the plot precisely. Coordinates show on the listing's map.
                </p>
              </div>
            </section>

            {/* Size, price & ownership */}
            <section className="rounded-2xl border border-ink-900/10 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-ink-900">Size, Price &amp; Ownership</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <FormField
                  id="landSize"
                  name="landSize"
                  label="Land Size"
                  required
                  placeholder="e.g. 1.2 Acres or 100 ft x 120 ft"
                  value={formData.landSize}
                  onChange={handleChange}
                  error={errors.landSize}
                />
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink-900">Ownership Type</label>
                  <Dropdown
                    label="Ownership Type"
                    options={OWNERSHIP_OPTIONS}
                    value={formData.ownershipType}
                    onChange={(val) => setFormData((prev) => ({ ...prev, ownershipType: val }))}
                    className="w-full"
                  />
                </div>
                <FormField
                  id="price"
                  name="price"
                  label="Starting Price (GHS)"
                  type="number"
                  min="0"
                  required
                  placeholder="e.g. 120000"
                  value={formData.price}
                  onChange={handleChange}
                  error={errors.price}
                  hint={!errors.price ? "The opening bid amount for the auction." : undefined}
                />
                <FormField
                  id="buyNowPrice"
                  name="buyNowPrice"
                  label="Buy Now Price (GHS)"
                  type="number"
                  min="0"
                  placeholder="Optional — e.g. 185000"
                  value={formData.buyNowPrice}
                  onChange={handleChange}
                  error={errors.buyNowPrice}
                  hint={!errors.buyNowPrice ? "Optional. Lets buyers skip the auction entirely." : undefined}
                />
                <FormField
                  id="titleDocRef"
                  name="titleDocRef"
                  label="Title / Document Reference"
                  placeholder="e.g. Land Title Certificate No. GA-4471"
                  value={formData.titleDocRef}
                  onChange={handleChange}
                  className="sm:col-span-2"
                  hint="Optional — helps verification move faster. You can also upload copies after listing."
                />
              </div>

              <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-forest-100 bg-forest-50/60 p-3.5">
                <ShieldCheckIcon className="mt-0.5 h-4 w-4 shrink-0 text-forest-600" />
                <p className="text-xs text-ink-700">
                  Listings go through TerraMatch's verification process before receiving a "Verified" badge.
                  You can list now and complete verification afterward from your dashboard.
                </p>
              </div>
            </section>

            {/* Amenities */}
            <section className="rounded-2xl border border-ink-900/10 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-ink-900">Amenities &amp; Features</h2>
              <p className="mt-1 text-sm text-ink-500">Select everything that applies.</p>
              <div className="mt-4 grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                {AMENITY_OPTIONS.map((amenity) => {
                  const checked = amenities.includes(amenity.id);
                  return (
                    <button
                      key={amenity.id}
                      type="button"
                      onClick={() => toggleAmenity(amenity.id)}
                      aria-pressed={checked}
                      className={cn(
                        "flex items-center gap-2 rounded-lg border px-3 py-2.5 text-left text-sm font-medium transition-colors",
                        checked
                          ? "border-forest-500 bg-forest-50 text-forest-700"
                          : "border-ink-900/15 bg-white text-ink-700 hover:bg-mist-100"
                      )}
                    >
                      <span
                        className={cn(
                          "flex h-4 w-4 shrink-0 items-center justify-center rounded border",
                          checked ? "border-forest-600 bg-forest-600" : "border-ink-900/25 bg-white"
                        )}
                      >
                        {checked && <CheckCircleIcon className="h-3 w-3 text-white" />}
                      </span>
                      {amenity.label}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Photos */}
            <section className="rounded-2xl border border-ink-900/10 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-ink-900">Photos</h2>
              <p className="mt-1 text-sm text-ink-500">
                Clear, well-lit photos get more bids. Add shots from multiple angles.
              </p>
              <div className="mt-4">
                <ImageUploadGrid value={images} onChange={setImages} maxImages={8} label="Land Photos" />
                {errors.images && <p className="mt-1.5 text-xs text-red-600">{errors.images}</p>}
              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button
                type="submit"
                variant="primary"
                size="md"
                className="flex-1"
                disabled={isBusy}
              >
                {submitState === "submitting" ? "Publishing…" : "Submit Listing"}
              </Button>
              <Button
                type="button"
                variant="outline-dark"
                size="md"
                className="flex-1"
                disabled={isBusy}
                onClick={handleSaveDraft}
              >
                {submitState === "saving-draft" ? "Saving…" : "Save Draft"}
              </Button>
            </div>
            {submitState === "error" && (
              <p className="text-center text-sm text-red-600">
                Something went wrong publishing your listing. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
      <MobileTabBar active="land" />
    </div>
  );
}
