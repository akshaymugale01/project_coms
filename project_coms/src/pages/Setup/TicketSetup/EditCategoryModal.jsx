import React from 'react'

const EditCategoryModal = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="fixed inset-0 bg-black bg-opacity-50"
              onClick={() => setIsCatEditModalOpen(false)}
            ></div>
            <div className="bg-white overflow-y-auto rounded-lg shadow-lg p-4 relative z-10">
              <button
                className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
                onClick={() => setIsCatEditModalOpen(false)}
              >
                <FaTimes size={20} />
              </button>
              <h2 className=" font-semibold mb-4">Edit Category</h2>
              <form>
                <div className="grid grid-cols-3 gap-4 mb-6">
                  <div className="form-group">
                    <label className="block mb-2">Enter Category</label>
                    <input
                      type="text"
                      className="border p-2 w-full"
                      placeholder="Enter Category"
                      value={formData.category}
                      name="category"
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group">
                    <label className="block mb-2">Select Engineer</label>
                    <select className="border p-2 w-full">
                      {engineers.map((engineer) => (
                        <option value={engineer.id} key={engineer.id}>
                          {engineer.firstname}
                          {engineer.lastname}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="form-group">
                    <label className="block mb-2">Response Time (min)</label>
                    <input
                      type="number"
                      className="border p-2 w-full"
                      placeholder="Response Time"
                      value={formData.minTat}
                      onChange={handleChange}
                      name="minTat"
                    />
                  </div>
                </div>

                <div className="flex justify-center ">
                  <button
                    style={{ background: themeColor }}
                    className=" text-white px-4 py-2 rounded-md "
                  >
                    {" "}
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
  )
}

export default EditCategoryModal
