export const CategoryInput = ({title, value, category, setCategory}) => {
  const handleChange = (e) => {
    if (e.target.checked) {
      setCategory(e.target.value)
      console.log(category)
      console.log(category.value)
    }
  }
  return (
    <div className="flex gap-10">
      <div className="inline-flex items-center">
        <label className="rounded-full relative flex cursor-pointer items-center p-3" htmlFor="html">
          <input
            name="category"
            type="radio"
            value={value}
            checked={category === value}
            onChange={handleChange}
            className="before:content[''] rounded-full border-blue-gray-200 before:rounded-full before:bg-blue-gray-500 peer relative h-5 w-5 cursor-pointer appearance-none border text-gray-900 transition-all before:absolute before:left-2/4 before:top-2/4 before:block before:h-12 before:w-12 before:-translate-x-2/4 before:-translate-y-2/4 before:opacity-0 before:transition-opacity checked:border-gray-900 checked:before:bg-gray-900 hover:before:opacity-10"
            id="html"
          />
          <span className="pointer-events-none absolute left-2/4 top-2/4 -translate-x-2/4 -translate-y-2/4 text-gray-900 opacity-0 transition-opacity peer-checked:opacity-100">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor">
              <circle data-name="ellipse" cx="8" cy="8" r="8"></circle>
            </svg>
          </span>
        </label>
        <label className="mt-px cursor-pointer select-none font-light text-gray-700" htmlFor="html">
          {title}
        </label>
      </div>
    </div>
  )
}
