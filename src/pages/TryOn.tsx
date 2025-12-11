import React, { useState, DragEvent } from "react"
import DashboardStats from "./DashboardStats"

// TYPES
type Vendor = "default" | "juguang" | "veoflow" | "gemini"

interface VendorStats {
  requests: number
  success: number
  failures: number
}

const TryOnTester = () => {
  // IMAGE STATES
  const [personImg, setPersonImg] = useState<File | null>(null)
  const [personUrl, setPersonUrl] = useState("")
  const [personPreview, setPersonPreview] = useState<string | null>(null)

  const [garmentImg, setGarmentImg] = useState<File | null>(null)
  const [garmentUrl, setGarmentUrl] = useState("")
  const [garmentPreview, setGarmentPreview] = useState<string | null>(null)

  // VENDOR
  const [vendor, setVendor] = useState<Vendor>("default")

  // NEW PROMPT BUILDER FIELDS
  const [tryonPrompt, setTryonPrompt] = useState("")
  const [backgroundPrompt, setBackgroundPrompt] = useState("")
  const [filterPrompt, setFilterPrompt] = useState("")
  const [enhancePrompt, setEnhancePrompt] = useState("")
  const [customPrompt, setCustomPrompt] = useState("")
  const [promptMode, setPromptMode] = useState("custom")

  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState<string | null>(null)
  const [error, setError] = useState("")
  const [rating, setRating] = useState(0);

  // DASHBOARD METRICS
  const [stats, setStats] = useState<Record<Vendor, VendorStats>>({
    default: { requests: 0, success: 0, failures: 0 },
    juguang: { requests: 0, success: 0, failures: 0 },
    veoflow: { requests: 0, success: 0, failures: 0 },
    gemini: { requests: 0, success: 0, failures: 0 }
  })

  const fileToBase64 = (file: File) =>
    new Promise<string>((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result as string)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })

  const handleDrop = (
    e: DragEvent<HTMLDivElement>,
    setFile: (file: File | null) => void,
    setPreview: (url: string | null) => void
  ) => {
    e.preventDefault()
    console.log("called")
    const file = e.dataTransfer.files?.[0]
    if (file) {
      setFile(file)
      setPreview(URL.createObjectURL(file))
    }
  }

 const handleFileSelect = (
  file: File | null,
  setFile: (file: File | null) => void,
  setPreview: (url: string | null) => void,
  clearUrl: () => void
) => {
  if (file) {
    setFile(file)
    setPreview(URL.createObjectURL(file))

    // 🔥 ensure URL clears AFTER preview updates
    setTimeout(() => {
      clearUrl()
    }, 0)
  }
}

  const updateStats = (vendor: Vendor, result: "success" | "fail") => {
    setStats(prev => ({
      ...prev,
      [vendor]: {
        requests: prev[vendor].requests + 1,
        success: prev[vendor].success + (result === "success" ? 1 : 0),
        failures: prev[vendor].failures + (result === "fail" ? 1 : 0)
      }
    }))
  }

  /** BUILD FINAL PROMPT */
const buildFinalPrompt = () => {
    const parts = [];
    
    // 1. CHECK THE MODE FIRST (Explicit Logic)
    if (promptMode === 'custom') {
       // We only use custom prompt if the user is explicitly in Custom Mode
       if (!customPrompt.trim()) return ""; // Handle empty case
        parts.push(`custom_prompt: ${customPrompt.trim().replace(/\n+/g, " ")}`);
    }

    // 2. STANDARD MODE (Assembler Logic)
   else{
    if (tryonPrompt.trim()) parts.push(`tryon_prompt: ${tryonPrompt.trim()}`);
    if (backgroundPrompt.trim()) parts.push(`background: ${backgroundPrompt.trim()}`);
    if (filterPrompt.trim()) parts.push(`filter: ${filterPrompt.trim()}`);
    if (enhancePrompt.trim()) parts.push(`enhance: ${enhancePrompt.trim()}`);
   }
   //(Optional) Include vendor if your backend needs it inside the prompt string
   if (vendor.trim() && vendor !== "default") {
        parts.push(`provider: ${vendor.trim()}`);
    }   

    return parts.join(" | ");
  }

  // TRY-ON ACTION
  const handleTryOn = async () => {
    try {
      setLoading(true)
      setError("")
      setOutput(null)

      let finalPerson = personUrl
      if (!finalPerson && personImg) finalPerson = await fileToBase64(personImg)

      let finalGarment = garmentUrl
      if (!finalGarment && garmentImg) finalGarment = await fileToBase64(garmentImg)

      if (!finalPerson || !finalGarment) {
        setError("Both images are required.")
        return
      }

      
      
      const payload = {
        face: finalPerson,
        model: finalGarment,
        prompt: buildFinalPrompt(),
        product_info: { garmentUrl }
      }
      
      const res = await fetch("http://localhost:5006/test/tryon", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      })

      const data = await res.json()
      
        // --- Handle backend errors ---
          // ❌ Backend explicitly returned error
      if (data.status !== "success") {
        setError(data.message || "Try-on failed")
        updateStats(vendor, "fail")
        return
      }


      let finalImage = null

      if (data.result_image_url) {
        updateStats(vendor, "success")
        finalImage = data.result_image_url
      } else if (data.image) {
        finalImage = `data:image/png;base64,${data.image}`
      }

    setOutput(finalImage)

    } catch (err) {
      setError("Error generating try-on.")
      updateStats(vendor, "fail")
    } finally {
      setLoading(false)
    }
  }

 return (
  <div className="max-w-7xl mx-auto p-6">

    {/* PAGE TITLE */}
    <h1 className="text-3xl font-bold mb-6 text-left">Try-On Test Tool</h1>

    {/* GRID: LEFT (inputs) | RIGHT (stats + output) */}
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">

      {/* LEFT SIDE — ALL INPUT SECTIONS */}
      <div className="xl:col-span-2 space-y-6">

        {/* TWO IMAGE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* PERSON IMAGE */}
      <div
        className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 transition hover:shadow-xl"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, setPersonImg, setPersonPreview)}
      >
        <h2 className="text-xl font-bold mb-3 text-[#555879]">User Image</h2>

        <div className="border-2 border-dashed border-indigo-300 rounded-lg p-4 text-center cursor-pointer min-h-[200px] flex items-center justify-center bg-indigo-50/30 transition hover:bg-indigo-50 relative">

          {personPreview ? (
            <div className="relative w-full flex items-center justify-center">

            {/* IMAGE */}
              <img
                src={personPreview}
                className="max-h-96 w-full object-contain rounded-lg shadow-md"
              />

              <button
                onClick={() => {
                  setPersonImg(null);
                  setPersonUrl("");
                  setPersonPreview(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Drag & drop an image here</p>
          )}
        </div>

        {/* FILE INPUT */}
        <input
          type="file"
          accept="image/*"
          className="mt-3 w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400"
          onChange={(e) =>
            handleFileSelect(
              e.target.files?.[0] || null,
              setPersonImg,
              setPersonPreview,
              () => setPersonUrl("")
            )
          }
        />

        {/* URL INPUT */}
        <input
          type="text"
          placeholder="Image URL"
          className="mt-3 w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400"
          value={personUrl}
          onChange={(e) => {
            const url = e.target.value.trim()
            setPersonUrl(url)
            setPersonImg(null)
            setPersonPreview(url.startsWith("http") ? url : null)
          }}
        />
      </div>

    {/* GARMENT IMAGE */}
      <div
        className="bg-white shadow-lg rounded-xl p-5 border border-gray-200 transition hover:shadow-xl"
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => handleDrop(e, setGarmentImg, setGarmentPreview)}
      >
        <h2 className="text-xl font-bold mb-3 text-[#555879]">Product Image</h2>

        <div className="border-2 border-dashed border-indigo-300 rounded-lg p-4 text-center cursor-pointer min-h-[200px] flex items-center justify-center bg-indigo-50/30 transition hover:bg-indigo-50 relative">

          {garmentPreview ? (
            <div className="relative w-full flex items-center justify-center">

              <img
                src={garmentPreview}
                className="max-h-96 w-full object-contain rounded-lg shadow-md"
              />

              <button
                onClick={() => {
                  setGarmentImg(null);
                  setGarmentUrl("");
                  setGarmentPreview(null);
                }}
                className="absolute top-2 right-2 bg-red-500 text-white text-xs px-3 py-1 rounded-full shadow hover:bg-red-600 transition"
              >
                Remove
              </button>
            </div>
          ) : (
            <p className="text-gray-500">Drag & & drop garment image here</p>
          )}
        </div>

        {/* FILE INPUT */}
        <input
          type="file"
          accept="image/*"
          className="mt-3 w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400"
          onChange={(e) =>
            handleFileSelect(
              e.target.files?.[0] || null,
              setGarmentImg,
              setGarmentPreview,
              () => setGarmentUrl("")
            )
          }
        />

        {/* URL INPUT */}
        <input
          type="text"
          placeholder="Image URL"
          className="mt-3 w-full border p-2 rounded-md focus:ring-2 focus:ring-indigo-400"
          value={garmentUrl}
          onChange={(e) => {
            const url = e.target.value.trim()
            setGarmentUrl(url)
            setGarmentImg(null)
            setGarmentPreview(url.startsWith("http") ? url : null)
          }}
        />
      </div>
        </div>

        {/* VENDOR SELECTOR */}
        <div>
          <label className="font-semibold">Vendor</label>
          <select
            className="w-full border p-3 rounded mt-2"
            value={vendor}
            onChange={(e) => setVendor(e.target.value as Vendor)}
          >
            <option value="default">Default (Auto-Select)</option>
            <option value="juguang">Juguang</option>
            <option value="veoflow">VeoFlow</option>
            <option value="gemini">Google Gemini</option>
          </select>
        </div>

      
{/* PROMPT BUILDER */}
<div className="bg-white shadow rounded-lg p-4 border mb-4">
  
  <div className="flex justify-between items-center mb-4">
    <h2 className="text-xl font-semibold">Prompt Builder</h2>
    
    {/* TOGGLE SWITCH */}
    <div className="bg-gray-100 p-1 rounded-lg flex text-sm">
      
      {/* STANDARD BUTTON (Blue when active) */}
      <button
        onClick={() => setPromptMode('standard')}
        className={`px-4 py-1.5 rounded-md transition-all ${
          promptMode === 'standard' 
            ? 'bg-blue-600 text-white shadow-sm'   // Active Style
            : 'text-gray-500 hover:text-gray-900'  // Inactive Style
        }`}
      >
        Standard
      </button>
      {/* CUSTOM BUTTON (Indigo when active) */}
      <button
        onClick={() => setPromptMode('custom')}
        className={`px-4 py-1.5 rounded-md transition-all ${
          promptMode === 'custom' 
            ? 'bg-amber-500 text-white shadow-sm' 
            : 'text-gray-500 hover:text-gray-900'
        }`}
      >
        Custom Mode
      </button>
    </div>
  </div>

  {/* === STANDARD MODE VIEW === */}
  {promptMode === 'standard' && (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Helper Text */}
      <div className="bg-blue-50 border border-blue-100 p-3 rounded-md text-sm text-blue-800">
        We will automatically assemble the prompt: 
        <span className="font-mono text-xs ml-1 block mt-1">
          [Instructions] + [Background] + [Filter] + [Enhance]
        </span>
      </div>

      <div>
        <label className="font-semibold block mb-1">Try-On Instructions</label>
        <textarea
          className="w-full border p-2 rounded focus:ring-2 focus:ring-black outline-none"
          placeholder="eg: Create a tryon showing the person from the first image....."
          value={tryonPrompt}
          onChange={(e) => setTryonPrompt(e.target.value)}
          rows={2}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <div>
          <label className="font-semibold text-sm block mb-1">Background</label>
          <input
            className="w-full border p-2 rounded focus:ring-2 focus:ring-black outline-none"
            placeholder="e.g., beach"
            value={backgroundPrompt}
            onChange={(e) => setBackgroundPrompt(e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold text-sm block mb-1">Filter</label>
          <input
            className="w-full border p-2 rounded focus:ring-2 focus:ring-black outline-none"
            placeholder="e.g., cinematic"
            value={filterPrompt}
            onChange={(e) => setFilterPrompt(e.target.value)}
          />
        </div>

        <div>
          <label className="font-semibold text-sm block mb-1">Enhance</label>
          <input
            className="w-full border p-2 rounded focus:ring-2 focus:ring-black outline-none"
            placeholder="e.g., 4k or aspect ratio 1:1 , 4:3"
            value={enhancePrompt}
            onChange={(e) => setEnhancePrompt(e.target.value)}
          />
        </div>
      </div>
    </div>
  )}

  {/* === CUSTOM MODE VIEW === */}
  {promptMode === 'custom' && (
    <div className="space-y-4 animate-in fade-in duration-200">
      {/* Warning Text */}
      <div className="bg-yellow-50 border border-yellow-200 p-3 rounded-md text-sm text-yellow-800">
        <strong>Custom mode:</strong>  You must  include Try on instruction, background, filters or other requirements here.
      </div>

      <div>
        <label className="font-semibold block mb-1">Custom Prompt</label>
        <textarea
          className="w-full border-2 border-yellow-300 bg-yellow-50/30 p-3 rounded min-h-[200px] focus:ring-2 focus:ring-yellow-500 outline-none font-mono text-sm"
          placeholder="Enter your full raw prompt here..."
          value={customPrompt}
          onChange={(e) => setCustomPrompt(e.target.value)}
        />
      </div>
    </div>
  )}
  </div>
        {/* TRY ON BUTTON */}
        <button
          onClick={handleTryOn}
          disabled={loading}
          className="w-full py-3 bg-black text-white rounded-xl text-lg font-bold hover:bg-gray-800 disabled:opacity-50"
        >
          {loading ? "Generating..." : "Try On"}
        </button>
      </div>

      {/* RIGHT SIDE — STATS + GENERATED OUTPUT */}

<div className="space-y-6">
  
    {/* GENERATED OUTPUT CARD */}
<div className="bg-white shadow-lg rounded-xl p-5 border border-gray-200">
  <h2 className="text-xl font-semibold mb-4 text-[#555879]">Generated Output</h2>

  {/* Preview Zone (same style as input cards) */}
  <div className="
    border-2 border-dashed border-indigo-300 rounded-lg
    p-4 text-center min-h-[200px]
    flex items-center justify-center bg-indigo-50/30
  ">
    {loading && (
      <div className="w-full h-64 bg-gray-200 animate-pulse rounded"></div>
    )}

    {!loading && error && (
      <p className="text-red-500 text-center font-semibold whitespace-pre-line">{error}</p>
    )}

    {!loading && !error && output && (
      <img
        src={output}
        className="max-h-96 w-full object-contain rounded-lg shadow-md"
      />
    )}

    {!loading && !error && !output && (
      <p className="text-gray-400">No output yet</p>
    )}
  </div>

  {/* Footer area — looks like other cards */}
  <div className="mt-4 w-full text-center">

    {/* When output exists → show rating */}
    {output ? (
      <>
        <p className="text-gray-600 mb-2">Rate this result</p>
        <div className="flex justify-center gap-2">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              onClick={() => setRating(star)}
              className={`text-2xl ${
                rating >= star ? "text-yellow-400" : "text-gray-300"
              } hover:text-yellow-500 transition`}
            >
              ★
            </button>
          ))}
        </div>
      </>
    ) : (
      // Placeholder to keep card height balanced
      <div className="text-gray-300 text-sm italic">⭐ Rating will appear after generation</div>
    )}
  </div>
</div>

  <DashboardStats stats={stats} />

</div>

    </div>

    {/* LOADING OVERLAY */}
    {loading && (
      <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
        <div className="bg-white px-6 py-5 rounded-2xl shadow-xl text-center space-y-3 w-64">
          <div className="animate-spin h-10 w-10 border-4 border-gray-300 border-t-black rounded-full mx-auto"></div>
          <p className="text-lg font-semibold">Generating Try-On…</p>
          <p className="text-sm text-gray-500">Please wait a moment</p>
        </div>
      </div>
    )}

  </div>
)

}

export default TryOnTester
