import React, { useState } from "react";

const Section = () => {
    const [sections, setSections] = useState([]);
    const [showInput, setShowInput] = useState(false);
    const [sectionName, setSectionName] = useState('');


    const createChecklist = async (sectionName) => {
        console.log(sectionName)
    
        const formData = new FormData();
        formData.append('board', idFromURL);
        formData.append('name', sectionName);
    
        try {
          const res = await postDataToAPI(AddBoardChecklist, formData);
    
          if (res.success) {
            console.log('Success')
    
          }
        } catch (error) {
          toast.error('Please Check Your Internet , Try again! ', { position: "top-center", autoClose: 2000 })
    
        } finally {
    
        }
    
      }
    
    

    const handleAddSection = () => {
        createChecklist(sectionName)
        console.log('Adding section:', sectionName);
    
        const newSection = {
          id: sections.length + 1,
          name: sectionName
        };
    
        setSections([...sections, newSection]);
    
        setSectionName('');
        setShowInput(false);
    
        window.location.reload();
      };
  return (
    <div>
      {!show ? (
        <div
          className="col-md-3 ml-2 mr-3"
          style={{
            borderRadius: 15,
            backgroundColor: "#133953",
            color: "#fff",
            padding: "15px",
          }}
        >
          <div>
            {!showInput ? (
              <div
                className="col-md-12 mb-0"
                style={{
                  fontSize: "16",
                  padding: 6,
                  border: "2px solid #30678edc",
                  borderRadius: 6,
                  height: 40,
                  color: "#dcdcdc",
                }}
                onClick={() => setShowInput(true)}
              >
                <i className="fa fa-plus ml-2 mr-2"></i> Add Section
              </div>
            ) : (
              <div>
                <input
                  type="text"
                  spellcheck="true"
                  value={sectionName}
                  onChange={(e) => setSectionName(e.target.value)}
                  placeholder="Enter section name"
                  className="col-md-12 mb-2"
                  style={{
                    fontSize: "16",
                    padding: 6,
                    border: "2px solid #30678edc",
                    borderRadius: 6,
                    height: 40,
                    color: "#fff",
                    backgroundColor: "#133953",
                  }}
                />
                <br></br>

                <button
                  onClick={() => setShowInput(false)}
                  style={{
                    marginRight: 6,
                    padding: "2px 12px",
                    border: "2px solid #0A9F6A",
                    backgroundColor: "#133953",
                    color: "#0A9F6A",
                  }}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddSection}
                  style={{ marginRight: 6, padding: "2px 12px" }}
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default Section;
