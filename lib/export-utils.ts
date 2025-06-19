import type { CVData } from "./cv-data"

export const exportToPDF = async (cvData: CVData, template: number, primaryColor: string, fontFamily: string) => {
  // Create a new window with the CV content
  const printWindow = window.open("", "_blank")
  if (!printWindow) return

  // Get the CV preview element
  const cvPreview = document.getElementById("cv-preview")
  if (!cvPreview) return

  // Clone the preview content
  const clonedContent = cvPreview.cloneNode(true) as HTMLElement

  // Create the print document
  const printDocument = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <title>${cvData.fullName || "Currículo"} - CV</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Roboto+Mono:wght@300;400;500&family=Dancing+Script:wght@400;500;600;700&display=swap');
          
          * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
          }
          
          body {
            font-family: ${fontFamily};
            line-height: 1.6;
            color: #333;
            background: white;
          }
          
          @page {
            size: A4;
            margin: 0.5in;
          }
          
          @media print {
            body {
              -webkit-print-color-adjust: exact;
              print-color-adjust: exact;
            }
          }
          
          .cv-container {
            transform: none !important;
            width: 100% !important;
            max-width: none !important;
            font-size: 14px;
          }
          
          /* Tailwind-like utilities */
          .text-center { text-align: center; }
          .text-left { text-align: left; }
          .text-right { text-align: right; }
          .font-bold { font-weight: 700; }
          .font-semibold { font-weight: 600; }
          .font-medium { font-weight: 500; }
          .font-light { font-weight: 300; }
          .italic { font-style: italic; }
          .text-sm { font-size: 0.875rem; }
          .text-lg { font-size: 1.125rem; }
          .text-xl { font-size: 1.25rem; }
          .text-2xl { font-size: 1.5rem; }
          .text-3xl { font-size: 1.875rem; }
          .text-4xl { font-size: 2.25rem; }
          .text-5xl { font-size: 3rem; }
          .mb-1 { margin-bottom: 0.25rem; }
          .mb-2 { margin-bottom: 0.5rem; }
          .mb-3 { margin-bottom: 0.75rem; }
          .mb-4 { margin-bottom: 1rem; }
          .mb-6 { margin-bottom: 1.5rem; }
          .mb-8 { margin-bottom: 2rem; }
          .mb-12 { margin-bottom: 3rem; }
          .mt-1 { margin-top: 0.25rem; }
          .mt-2 { margin-top: 0.5rem; }
          .mt-4 { margin-top: 1rem; }
          .mt-8 { margin-top: 2rem; }
          .p-4 { padding: 1rem; }
          .p-6 { padding: 1.5rem; }
          .p-8 { padding: 2rem; }
          .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
          .px-4 { padding-left: 1rem; padding-right: 1rem; }
          .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
          .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
          .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
          .pl-4 { padding-left: 1rem; }
          .pl-8 { padding-left: 2rem; }
          .pb-2 { padding-bottom: 0.5rem; }
          .pb-4 { padding-bottom: 1rem; }
          .pb-6 { padding-bottom: 1.5rem; }
          .pt-8 { padding-top: 2rem; }
          .w-full { width: 100%; }
          .h-1 { height: 0.25rem; }
          .h-2 { height: 0.5rem; }
          .max-w-2xl { max-width: 42rem; }
          .max-w-3xl { max-width: 48rem; }
          .max-w-4xl { max-width: 56rem; }
          .mx-auto { margin-left: auto; margin-right: auto; }
          .flex { display: flex; }
          .grid { display: grid; }
          .items-center { align-items: center; }
          .items-start { align-items: flex-start; }
          .items-end { align-items: flex-end; }
          .justify-between { justify-content: space-between; }
          .justify-center { justify-content: center; }
          .gap-1 { gap: 0.25rem; }
          .gap-2 { gap: 0.5rem; }
          .gap-3 { gap: 0.75rem; }
          .gap-4 { gap: 1rem; }
          .gap-6 { gap: 1.5rem; }
          .gap-8 { gap: 2rem; }
          .space-y-2 > * + * { margin-top: 0.5rem; }
          .space-y-3 > * + * { margin-top: 0.75rem; }
          .space-y-4 > * + * { margin-top: 1rem; }
          .space-y-6 > * + * { margin-top: 1.5rem; }
          .space-y-8 > * + * { margin-top: 2rem; }
          .rounded { border-radius: 0.25rem; }
          .rounded-lg { border-radius: 0.5rem; }
          .rounded-full { border-radius: 9999px; }
          .border { border-width: 1px; }
          .border-2 { border-width: 2px; }
          .border-4 { border-width: 4px; }
          .border-8 { border-width: 8px; }
          .border-l-4 { border-left-width: 4px; }
          .border-b { border-bottom-width: 1px; }
          .border-b-2 { border-bottom-width: 2px; }
          .shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
          .shadow-md { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
          .shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
          .shadow-xl { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }
          .bg-white { background-color: #fff; }
          .bg-gray-50 { background-color: #f9fafb; }
          .bg-gray-100 { background-color: #f3f4f6; }
          .bg-gray-200 { background-color: #e5e7eb; }
          .bg-gray-300 { background-color: #d1d5db; }
          .bg-gray-700 { background-color: #374151; }
          .bg-gray-800 { background-color: #1f2937; }
          .bg-gray-900 { background-color: #111827; }
          .text-gray-300 { color: #d1d5db; }
          .text-gray-400 { color: #9ca3af; }
          .text-gray-500 { color: #6b7280; }
          .text-gray-600 { color: #4b5563; }
          .text-gray-700 { color: #374151; }
          .text-gray-800 { color: #1f2937; }
          .text-white { color: #fff; }
          .border-gray-100 { border-color: #f3f4f6; }
          .border-gray-200 { border-color: #e5e7eb; }
          .border-gray-300 { border-color: #d1d5db; }
          .border-gray-700 { border-color: #374151; }
          .border-white { border-color: #fff; }
          .object-cover { object-fit: cover; }
          .leading-relaxed { line-height: 1.625; }
          .tracking-tight { letter-spacing: -0.025em; }
          .tracking-wide { letter-spacing: 0.025em; }
          .font-mono { font-family: 'Roboto Mono', monospace; }
          .relative { position: relative; }
          .absolute { position: absolute; }
          .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
          .top-0 { top: 0; }
          .top-2 { top: 0.5rem; }
          .top-5 { top: 1.25rem; }
          .left-0 { left: 0; }
          .left-1\\.5 { left: 0.375rem; }
          .left-1\\/2 { left: 50%; }
          .transform { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
          .-translate-x-1\\/2 { --tw-translate-x: -50%; }
          .w-2 { width: 0.5rem; }
          .w-3 { width: 0.75rem; }
          .w-8 { width: 2rem; }
          .w-12 { width: 3rem; }
          .w-16 { width: 4rem; }
          .w-24 { width: 6rem; }
          .w-32 { width: 8rem; }
          .w-40 { width: 10rem; }
          .h-2 { height: 0.5rem; }
          .h-3 { height: 0.75rem; }
          .h-8 { height: 2rem; }
          .h-12 { height: 3rem; }
          .h-16 { height: 4rem; }
          .h-24 { height: 6rem; }
          .h-32 { height: 8rem; }
          .h-40 { height: 10rem; }
          .h-48 { height: 12rem; }
          .overflow-hidden { overflow: hidden; }
          .opacity-10 { opacity: 0.1; }
          .opacity-20 { opacity: 0.2; }
          .opacity-90 { opacity: 0.9; }
          .z-10 { z-index: 10; }
          .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
          .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
          .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
          .grid-cols-8 { grid-template-columns: repeat(8, minmax(0, 1fr)); }
          .aspect-square { aspect-ratio: 1 / 1; }
          .flex-1 { flex: 1 1 0%; }
          .flex-shrink-0 { flex-shrink: 0; }
          .flex-wrap { flex-wrap: wrap; }
          .break-all { word-break: break-all; }
          
          /* Custom styles for specific templates */
          .bg-primary { background-color: ${primaryColor}; }
          .text-primary { color: ${primaryColor}; }
          .border-primary { border-color: ${primaryColor}; }
          
          /* Print-specific adjustments */
          @media print {
            .gri-cols-1 { grid-template-columns: 1fr; }
            .text-5xl { font-size: 2.5rem; }
            .text-4xl { font-size: 2rem; }
            .text-3xl { font-size: 1.75rem; }
            .p-8 { padding: 1.5rem; }
            .mb-12 { margin-bottom: 2rem; }
            .mb-8 { margin-bottom: 1.5rem; }
          }
        </style>
      </head>
      <body>
        <div class="cv-container">
          ${clonedContent.innerHTML}
        </div>
      </body>
    </html>
  `

  printWindow.document.write(printDocument)
  printWindow.document.close()

  // Wait for content to load, then print
  printWindow.onload = () => {
    setTimeout(() => {
      printWindow.print()
      printWindow.close()
    }, 500)
  }
}

export const exportToHTML = (cvData: CVData, template: number, primaryColor: string, fontFamily: string) => {
  // Get the CV preview element
  const cvPreview = document.getElementById("cv-preview")
  if (!cvPreview) return

  // Clone the preview content
  const clonedContent = cvPreview.cloneNode(true) as HTMLElement

  // Create the HTML document
  const htmlDocument = `
<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${cvData.fullName || "Currículo"} - CV</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:wght@400;500;600;700&family=Roboto+Mono:wght@300;400;500&family=Dancing+Script:wght@400;500;600;700&display=swap');
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: ${fontFamily};
            line-height: 1.6;
            color: #333;
            background: #f5f5f5;
            padding: 20px;
        }
        
        .cv-container {
            max-width: 210mm;
            margin: 0 auto;
            background: white;
            box-shadow: 0 0 20px rgba(0,0,0,0.1);
            transform: none !important;
            width: 100% !important;
        }
        
        /* Include all the Tailwind-like utilities from the PDF export */
        .text-center { text-align: center; }
        .text-left { text-align: left; }
        .text-right { text-align: right; }
        .font-bold { font-weight: 700; }
        .font-semibold { font-weight: 600; }
        .font-medium { font-weight: 500; }
        .font-light { font-weight: 300; }
        .italic { font-style: italic; }
        .text-sm { font-size: 0.875rem; }
        .text-lg { font-size: 1.125rem; }
        .text-xl { font-size: 1.25rem; }
        .text-2xl { font-size: 1.5rem; }
        .text-3xl { font-size: 1.875rem; }
        .text-4xl { font-size: 2.25rem; }
        .text-5xl { font-size: 3rem; }
        .mb-1 { margin-bottom: 0.25rem; }
        .mb-2 { margin-bottom: 0.5rem; }
        .mb-3 { margin-bottom: 0.75rem; }
        .mb-4 { margin-bottom: 1rem; }
        .mb-6 { margin-bottom: 1.5rem; }
        .mb-8 { margin-bottom: 2rem; }
        .mb-12 { margin-bottom: 3rem; }
        .mt-1 { margin-top: 0.25rem; }
        .mt-2 { margin-top: 0.5rem; }
        .mt-4 { margin-top: 1rem; }
        .mt-8 { margin-top: 2rem; }
        .p-4 { padding: 1rem; }
        .p-6 { padding: 1.5rem; }
        .p-8 { padding: 2rem; }
        .px-3 { padding-left: 0.75rem; padding-right: 0.75rem; }
        .px-4 { padding-left: 1rem; padding-right: 1rem; }
        .py-1 { padding-top: 0.25rem; padding-bottom: 0.25rem; }
        .py-2 { padding-top: 0.5rem; padding-bottom: 0.5rem; }
        .py-4 { padding-top: 1rem; padding-bottom: 1rem; }
        .pl-4 { padding-left: 1rem; }
        .pl-8 { padding-left: 2rem; }
        .pb-2 { padding-bottom: 0.5rem; }
        .pb-4 { padding-bottom: 1rem; }
        .pb-6 { padding-bottom: 1.5rem; }
        .pt-8 { padding-top: 2rem; }
        .w-full { width: 100%; }
        .h-1 { height: 0.25rem; }
        .h-2 { height: 0.5rem; }
        .max-w-2xl { max-width: 42rem; }
        .max-w-3xl { max-width: 48rem; }
        .max-w-4xl { max-width: 56rem; }
        .mx-auto { margin-left: auto; margin-right: auto; }
        .flex { display: flex; }
        .grid { display: grid; }
        .items-center { align-items: center; }
        .items-start { align-items: flex-start; }
        .items-end { align-items: flex-end; }
        .justify-between { justify-content: space-between; }
        .justify-center { justify-content: center; }
        .gap-1 { gap: 0.25rem; }
        .gap-2 { gap: 0.5rem; }
        .gap-3 { gap: 0.75rem; }
        .gap-4 { gap: 1rem; }
        .gap-6 { gap: 1.5rem; }
        .gap-8 { gap: 2rem; }
        .space-y-2 > * + * { margin-top: 0.5rem; }
        .space-y-3 > * + * { margin-top: 0.75rem; }
        .space-y-4 > * + * { margin-top: 1rem; }
        .space-y-6 > * + * { margin-top: 1.5rem; }
        .space-y-8 > * + * { margin-top: 2rem; }
        .rounded { border-radius: 0.25rem; }
        .rounded-lg { border-radius: 0.5rem; }
        .rounded-full { border-radius: 9999px; }
        .border { border-width: 1px; }
        .border-2 { border-width: 2px; }
        .border-4 { border-width: 4px; }
        .border-8 { border-width: 8px; }
        .border-l-4 { border-left-width: 4px; }
        .border-b { border-bottom-width: 1px; }
        .border-b-2 { border-bottom-width: 2px; }
        .shadow-sm { box-shadow: 0 1px 2px 0 rgb(0 0 0 / 0.05); }
        .shadow-md { box-shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1); }
        .shadow-lg { box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1); }
        .shadow-xl { box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1); }
        .bg-white { background-color: #fff; }
        .bg-gray-50 { background-color: #f9fafb; }
        .bg-gray-100 { background-color: #f3f4f6; }
        .bg-gray-200 { background-color: #e5e7eb; }
        .bg-gray-300 { background-color: #d1d5db; }
        .bg-gray-700 { background-color: #374151; }
        .bg-gray-800 { background-color: #1f2937; }
        .bg-gray-900 { background-color: #111827; }
        .text-gray-300 { color: #d1d5db; }
        .text-gray-400 { color: #9ca3af; }
        .text-gray-500 { color: #6b7280; }
        .text-gray-600 { color: #4b5563; }
        .text-gray-700 { color: #374151; }
        .text-gray-800 { color: #1f2937; }
        .text-white { color: #fff; }
        .border-gray-100 { border-color: #f3f4f6; }
        .border-gray-200 { border-color: #e5e7eb; }
        .border-gray-300 { border-color: #d1d5db; }
        .border-gray-700 { border-color: #374151; }
        .border-white { border-color: #fff; }
        .object-cover { object-fit: cover; }
        .leading-relaxed { line-height: 1.625; }
        .tracking-tight { letter-spacing: -0.025em; }
        .tracking-wide { letter-spacing: 0.025em; }
        .font-mono { font-family: 'Roboto Mono', monospace; }
        .relative { position: relative; }
        .absolute { position: absolute; }
        .inset-0 { top: 0; right: 0; bottom: 0; left: 0; }
        .top-0 { top: 0; }
        .top-2 { top: 0.5rem; }
        .top-5 { top: 1.25rem; }
        .left-0 { left: 0; }
        .left-1\\.5 { left: 0.375rem; }
        .left-1\\/2 { left: 50%; }
        .transform { transform: translate(var(--tw-translate-x), var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y)); }
        .-translate-x-1\\/2 { --tw-translate-x: -50%; }
        .w-2 { width: 0.5rem; }
        .w-3 { width: 0.75rem; }
        .w-8 { width: 2rem; }
        .w-12 { width: 3rem; }
        .w-16 { width: 4rem; }
        .w-24 { width: 6rem; }
        .w-32 { width: 8rem; }
        .w-40 { width: 10rem; }
        .h-2 { height: 0.5rem; }
        .h-3 { height: 0.75rem; }
        .h-8 { height: 2rem; }
        .h-12 { height: 3rem; }
        .h-16 { height: 4rem; }
        .h-24 { height: 6rem; }
        .h-32 { height: 8rem; }
        .h-40 { height: 10rem; }
        .h-48 { height: 12rem; }
        .overflow-hidden { overflow: hidden; }
        .opacity-10 { opacity: 0.1; }
        .opacity-20 { opacity: 0.2; }
        .opacity-90 { opacity: 0.9; }
        .z-10 { z-index: 10; }
        .grid-cols-1 { grid-template-columns: repeat(1, minmax(0, 1fr)); }
        .grid-cols-2 { grid-template-columns: repeat(2, minmax(0, 1fr)); }
        .grid-cols-3 { grid-template-columns: repeat(3, minmax(0, 1fr)); }
        .grid-cols-8 { grid-template-columns: repeat(8, minmax(0, 1fr)); }
        .aspect-square { aspect-ratio: 1 / 1; }
        .flex-1 { flex: 1 1 0%; }
        .flex-shrink-0 { flex-shrink: 0; }
        .flex-wrap { flex-wrap: wrap; }
        .break-all { word-break: break-all; }
        
        /* Custom styles */
        .bg-primary { background-color: ${primaryColor}; }
        .text-primary { color: ${primaryColor}; }
        .border-primary { border-color: ${primaryColor}; }
        
        @media (max-width: 768px) {
            body { padding: 10px; }
            .cv-container { box-shadow: none; }
            .grid-cols-2 { grid-template-columns: 1fr; }
            .text-5xl { font-size: 2.5rem; }
            .text-4xl { font-size: 2rem; }
        }
        
        @media print {
            body { 
                background: white; 
                padding: 0; 
            }
            .cv-container { 
                box-shadow: none; 
                max-width: none;
            }
        }
    </style>
</head>
<body>
    <div class="cv-container">
        ${clonedContent.innerHTML}
    </div>
</body>
</html>`

  // Create and download the file
  const blob = new Blob([htmlDocument], { type: "text/html" })
  const url = URL.createObjectURL(blob)
  const link = document.createElement("a")
  link.href = url
  link.download = `${cvData.fullName || "curriculo"}-cv.html`
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
  URL.revokeObjectURL(url)
}
