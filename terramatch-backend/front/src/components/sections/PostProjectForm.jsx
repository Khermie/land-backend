import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../common/Button";
import Dropdown from "../common/Dropdown";
import FormField from "../common/FormField";
import ImageUploadGrid from "../common/ImageUploadGrid";
import FileAttachmentList from "../common/FileAttachmentList";
import InAppPageHeader from "../common/InAppPageHeader";
import MobileTabBar from "../common/MobileTabBar";
import AIAssistantPanel from "./AIAssistantPanel";
import { CONTRACTOR_CATEGORY_OPTIONS } from "../../constants/contractors";
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

function CalendarIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" strokeWidth="1.6" />
      <path d="M8 3v4M16 3v4M3.5 10h17" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function SparkleOutlineIcon({ className }) {
  return (
    <svg viewBox="0 0 24 24" className={cn("fill-none stroke-current", className)} aria-hidden="true">
      <path
        d="M12 3l1.6 4.6L18 9l-4.4 1.4L12 15l-1.6-4.6L6 9l4.4-1.4L12 3z"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const PROJECT_CATEGORY_OPTIONS = CONTRACTOR_CATEGORY_OPTIONS.filter((c) => c !== "All Categories");

const BUDGET_RANGES = [
  "Under GHS 10,000",
  "GHS 10,000 – 30,000",
  "GHS 30,000 – 75,000",
  "GHS 75,000 – 150,000",
  "GHS 150,000 – 300,000",
  "Above GHS 300,000",
];

const TIMELINE_OPTIONS = [
  "As soon as possible",
  "Within 1 month",
  "1 – 3 months",
  "3 – 6 months",
  "6+ months",
  "Flexible",
];

const initialFormState = {
  title: "",
  category: PROJECT_CATEGORY_OPTIONS[0],
  description: "",
  budgetRange: BUDGET_RANGES[0],
  timeline: TIMELINE_OPTIONS[0],
  location: "",
};

export default function PostProjectForm() {
  const navigate = useNavigate();
  const { addProject } = useListings();

  const [formData, setFormData] = useState(initialFormState);
  const [images, setImages] = useState([]);
  const [attachments, setAttachments] = useState([]);
  const [errors, setErrors] = useState({});
  const [submitState, setSubmitState] = useState("idle"); // idle | submitting | saving-draft | success | error
  const [publishedSlug, setPublishedSlug] = useState(null);

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  }

  function validate() {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = "Project title is required";
    if (!formData.description.trim()) newErrors.description = "Description is required";
    else if (formData.description.trim().length < 20)
      newErrors.description = "Add a bit more detail (at least 20 characters)";
    if (!formData.location.trim()) newErrors.location = "Location is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function buildRecord(status) {
    return {
      title: formData.title.trim(),
      category: formData.category,
      description: formData.description.trim(),
      budgetRange: formData.budgetRange,
      timeline: formData.timeline,
      location: formData.location.trim(),
      imageCount: images.length,
      coverImageUrl: images[0]?.url ?? null,
      attachmentCount: attachments.length,
      status,
    };
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;

    setSubmitState("submitting");
    setTimeout(() => {
      try {
        const record = addProject(buildRecord("published"), "published");
        setPublishedSlug(record.slug);
        setSubmitState("success");
      } catch {
        setSubmitState("error");
      }
    }, 900);
  }

  function handleSaveDraft() {
    if (!formData.title.trim()) {
      setErrors((prev) => ({ ...prev, title: "Give your draft a title so you can find it later" }));
      return;
    }
    setSubmitState("saving-draft");
    setTimeout(() => {
      addProject(buildRecord("draft"), "draft");
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
          <h1 className="mt-5 text-2xl font-bold text-ink-900">Your project is posted!</h1>
          <p className="mt-2 max-w-sm text-sm text-ink-500">
            "{formData.title}" is now visible to verified contractors. You'll be notified as bids
            come in.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Button as="a" href="/find-contractor" variant="primary" size="md">
              Browse Contractors
            </Button>
            <Button as="a" href="/dashboard" variant="outline-dark" size="md">
              Back to Dashboard
            </Button>
          </div>
        </div>
        <MobileTabBar active="projects" />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-mist-50">
      <div className="flex-1 overflow-y-auto">
        <div className="mx-auto max-w-3xl px-4 pt-4 pb-8 sm:px-6">
          <InAppPageHeader
            title="Post a Project"
            subtitle="Describe what you need built — our AI assistant will suggest contractors as you go."
          />

          <form onSubmit={handleSubmit} className="mt-6 space-y-6">
            {/* Basic details */}
            <section className="rounded-2xl border border-ink-900/10 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-ink-900">Project Details</h2>
              <div className="mt-4 space-y-4">
                <FormField
                  id="title"
                  name="title"
                  label="Project Title"
                  required
                  placeholder="e.g. 3-Bedroom House Construction in East Legon"
                  value={formData.title}
                  onChange={handleChange}
                  error={errors.title}
                />

                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink-900">Category</label>
                  <Dropdown
                    label="Category"
                    options={PROJECT_CATEGORY_OPTIONS}
                    value={formData.category}
                    onChange={(val) => setFormData((prev) => ({ ...prev, category: val }))}
                    className="w-full"
                  />
                </div>

                <FormField
                  id="description"
                  name="description"
                  label="Description"
                  as="textarea"
                  rows={5}
                  required
                  placeholder="Describe the scope of work, materials, specific requirements…"
                  value={formData.description}
                  onChange={handleChange}
                  error={errors.description}
                  hint={!errors.description ? "Minimum 20 characters." : undefined}
                />

                <FormField
                  id="location"
                  name="location"
                  label="Location"
                  required
                  placeholder="e.g. East Legon, Accra"
                  value={formData.location}
                  onChange={handleChange}
                  error={errors.location}
                />
              </div>
            </section>

            {/* Budget & timeline */}
            <section className="rounded-2xl border border-ink-900/10 bg-white p-5 sm:p-6">
              <h2 className="flex items-center gap-1.5 text-base font-bold text-ink-900">
                <CalendarIcon className="h-4 w-4 text-forest-600" />
                Budget &amp; Timeline
              </h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink-900">Budget Range</label>
                  <Dropdown
                    label="Budget Range"
                    options={BUDGET_RANGES}
                    value={formData.budgetRange}
                    onChange={(val) => setFormData((prev) => ({ ...prev, budgetRange: val }))}
                    className="w-full"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-ink-900">Timeline</label>
                  <Dropdown
                    label="Timeline"
                    options={TIMELINE_OPTIONS}
                    value={formData.timeline}
                    onChange={(val) => setFormData((prev) => ({ ...prev, timeline: val }))}
                    className="w-full"
                  />
                </div>
              </div>
              <p className="mt-3 text-xs text-ink-500">
                Budget is shown as a range to contractors — you'll agree on exact pricing once you
                start reviewing bids.
              </p>
            </section>

            {/* AI contractor assistant — appears once there's enough of a
                brief (category + description) for recommendations to be
                meaningful, rather than showing generic matches from an
                empty form. */}
            {formData.category !== PROJECT_CATEGORY_OPTIONS[0] || formData.description.trim().length >= 20 ? (
              <AIAssistantPanel
                brief={{
                  category: formData.category,
                  location: formData.location,
                  budgetRange: formData.budgetRange,
                  description: formData.description,
                }}
              />
            ) : (
              <div className="flex items-center gap-3 rounded-2xl border border-dashed border-ink-900/15 bg-mist-50 p-5 text-sm text-ink-500">
                <SparkleOutlineIcon className="h-5 w-5 shrink-0 text-forest-500" />
                Fill in a category and description above to unlock AI contractor matches for this
                project.
              </div>
            )}

            {/* Photos */}
            <section className="rounded-2xl border border-ink-900/10 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-ink-900">Reference Photos</h2>
              <p className="mt-1 text-sm text-ink-500">
                Site photos, inspiration images, or existing plans — optional but helps contractors
                scope accurately.
              </p>
              <div className="mt-4">
                <ImageUploadGrid value={images} onChange={setImages} maxImages={6} label="Photos" />
              </div>
            </section>

            {/* Attachments */}
            <section className="rounded-2xl border border-ink-900/10 bg-white p-5 sm:p-6">
              <h2 className="text-base font-bold text-ink-900">Attachments</h2>
              <p className="mt-1 text-sm text-ink-500">
                Architectural drawings, site plans, or spec sheets, if you have them.
              </p>
              <div className="mt-4">
                <FileAttachmentList
                  value={attachments}
                  onChange={setAttachments}
                  maxFiles={5}
                  label="Documents"
                />
              </div>
            </section>

            {/* Actions */}
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button type="submit" variant="primary" size="md" className="flex-1" disabled={isBusy}>
                {submitState === "submitting" ? "Posting…" : "Post Project"}
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
                Something went wrong posting your project. Please try again.
              </p>
            )}
          </form>
        </div>
      </div>
      <MobileTabBar active="projects" />
    </div>
  );
}
