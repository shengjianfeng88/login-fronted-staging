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

  const [loading, setLoading] = useState(false)
  const [output, setOutput] = useState<string | null>(null)
  const [error, setError] = useState("")

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

  /** 🔥 BUILD FINAL PROMPT */
  const buildFinalPrompt = () => {
    const parts = []
    if (customPrompt.trim())   return `custom_prompt: ${customPrompt.trim().replace(/\n+/g, " ")}`
    
    if (vendor.trim() && vendor !== "default") {
        parts.push(`provider: ${vendor.trim()}`)
    }     
    if (tryonPrompt.trim()) parts.push(`tryon_prompt: ${tryonPrompt.trim()}`)
    if (backgroundPrompt.trim()) parts.push(`background: ${backgroundPrompt.trim()}`)
    if (filterPrompt.trim()) parts.push(`filter: ${filterPrompt.trim()}`)
    if (enhancePrompt.trim()) parts.push(`enhance: ${enhancePrompt.trim()}`)

    return parts.join(" | ")
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

      updateStats(vendor, "success")

      const payload = {
        provider: vendor,
        face: finalPerson,
        model: finalGarment,
        prompt: buildFinalPrompt(),
        product_info: { vendor }
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
            className="bg-white shadow rounded-lg p-4 border"
            onDragOver={(e) => e.preventDefault()}
            onDrop={(e) => handleDrop(e, setPersonImg, setPersonPreview)}
          >
            <h2 className="text-xl font-semibold mb-3">Person Image</h2>

            <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer min-h-[180px] flex items-center justify-center relative">

              {personPreview ? (
                <div className="relative w-full flex items-center justify-center">

                  {/* IMAGE */}
                  <img
                    src={personPreview}
                    className="max-h-96 w-full object-contain rounded-lg"
                  />

                  {/* REMOVE BUTTON */}
                  <button
                    onClick={() => {
                      setPersonImg(null);
                      setPersonUrl("");
                      setPersonPreview(null);
                    }}
                    className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded hover:bg-black"
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
              className="mt-3 w-full border p-2 rounded"
                      onChange={(e) =>
                  handleFileSelect(
                    e.target.files?.[0] || null,
                    setPersonImg,
                    setPersonPreview,
                    () => setPersonUrl("")  // clear the URL after preview loads
                  )
                }
                      />
          {/* URL INPUT */}
          <input
            type="text"
            placeholder="Or paste image URL"
            className="mt-3 w-full border p-2 rounded"
            value={personUrl}
            onChange={(e) => {
            const url = e.target.value.trim()
            setPersonUrl(url)

            // Clear file so URL takes priority
            setPersonImg(null)

            // If it's a valid URL → show preview
            if (url.startsWith("http")) {
              setPersonPreview(url)
            } else {
              setPersonPreview(null)
            }
          }}
          />
          </div>


         {/* GARMENT IMAGE */}
        <div
          className="bg-white shadow rounded-lg p-4 border"
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleDrop(e, setGarmentImg, setGarmentPreview)}
        >
          <h2 className="text-xl font-semibold mb-3">Garment Image</h2>

          <div className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer min-h-[180px] flex items-center justify-center relative">

            {garmentPreview ? (
              <div className="relative w-full flex items-center justify-center">

                    {/* IMAGE */}
            <img
              src={garmentPreview}
              className="max-h-96 w-full object-contain rounded-lg"
            />

            {/* REMOVE BUTTON */}
            <button
              onClick={() => {
                setGarmentImg(null);
                setGarmentUrl("");
                setGarmentPreview(null);
              }}
              className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded hover:bg-black"
            >
              Remove
            </button>
          </div>
        ) : (
          <p className="text-gray-500">Drag & drop garment image here</p>
        )}
      </div>

      {/* FILE INPUT */}
      <input
        type="file"
        accept="image/*"
        className="mt-3 w-full border p-2 rounded"
        onChange={(e) =>
        handleFileSelect(
          e.target.files?.[0] || null,
          setGarmentImg,
          setGarmentPreview,  
          () => setGarmentUrl("")   // 🔥 clear URL
        )
      }
      />

    {/* URL INPUT */}
    <input
      type="text"
      placeholder="Or paste image URL"
      className="mt-3 w-full border p-2 rounded"
      value={garmentUrl}
      onChange={(e) => {
        const url = e.target.value.trim()
        setGarmentUrl(e.target.value)
        setGarmentImg(null)        // 🔥 clear uploaded file
        // If it's a valid URL → show preview
            if (url.startsWith("http")) {
              setGarmentPreview(url)
            } else {
              setGarmentPreview(null)
            }    // 🔥 clear preview
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
        <div className="bg-white shadow rounded-lg p-4 border space-y-4">
          <h2 className="text-xl font-semibold">Prompt Builder</h2>

          <div>
            <label className="font-semibold">Try-On Instructions</label>
            <textarea
              className="w-full border p-2 rounded"
              placeholder="preserve identity, maintain pose..."
              value={tryonPrompt}
              onChange={(e) => setTryonPrompt(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Background</label>
            <input
              className="w-full border p-2 rounded"
              placeholder="e.g., beach, studio"
              value={backgroundPrompt}
              onChange={(e) => setBackgroundPrompt(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Filter</label>
            <input
              className="w-full border p-2 rounded"
              placeholder="cinematic, soft light..."
              value={filterPrompt}
              onChange={(e) => setFilterPrompt(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Enhance</label>
            <input
              className="w-full border p-2 rounded"
              placeholder="boost clarity, increase sharpness..."
              value={enhancePrompt}
              onChange={(e) => setEnhancePrompt(e.target.value)}
            />
          </div>

          <div>
            <label className="font-semibold">Custom Prompt (Overrides All)</label>
            <textarea
              className="w-full border p-2 rounded bg-yellow-50"
              placeholder="If filled, this replaces everything above"
              value={customPrompt}
              onChange={(e) => setCustomPrompt(e.target.value)}
            />
          </div>
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

        <DashboardStats stats={stats} />  

        <div className="bg-white shadow rounded-lg p-4 border">
            <h2 className="text-xl font-semibold mb-4">Generated Output</h2>

            {/* Loading skeleton */}
            {loading && (
              <div className="w-full h-64 bg-gray-200 animate-pulse rounded"></div>
            )}

            {/* ❌ Error message */}
            {!loading && error && (
              <p className="text-red-500 text-center font-semibold whitespace-pre-line">
                {error}
              </p>
            )}

            {/* ✔ Output image */}
            {!loading && !error && output && (
              <img
                src={output}
                className="max-h-96 w-full object-contain rounded-lg"
              />
            )}

            {/* ⛔ No output yet */}
            {!loading && !error && !output && (
              <p className="text-gray-400 text-center">No output yet</p>
            )}
        </div>

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
