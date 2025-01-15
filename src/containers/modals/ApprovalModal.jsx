import React, { useState } from 'react'
import ModalWrapper from './ModalWrapper'
import { useParams } from 'react-router-dom'
import { editComplaintsDetails } from '../../api'
import { useSelector } from 'react-redux'
import toast from 'react-hot-toast'

const ApprovalModal = ({ onclose, issueStatusId }) => {
  const [comment, setComment] = useState("")
  const themeColor = useSelector((state) => state.theme.color)

  const { id } = useParams()

  const handleApproval = async () => {
    if (comment === "") {
      return toast.error("Please Enter Comment");
    }
    const payload = {
      complaint_log: {
        complaint_id: id,
        complaint_status_id: issueStatusId,
      },
      comment: comment
    }
    try {
      console.log(payload)

      const resp = await editComplaintsDetails(payload)
      onclose()

      toast.success("Items Approved")
      console.log(resp)
    } catch (error) {
      console.log(error)
      toast.error("Something Went Wrong")
    }
  }

  return (
    <ModalWrapper onclose={onclose}>
      <div className="flex flex-col gap-4 z-10">
        <h1 className="font-semibold text-center text-xl">Add Request</h1>
        <div className="flex flex-col gap-4">

          <div className="flex flex-col">
            <label htmlFor="remarks" className="font-medium">
              Remarks
            </label>
            <textarea
              className="border border-gray-400 rounded-md px-2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              cols={10}
            ></textarea>
          </div>
          <div className="flex justify-center">
            <button onClick={handleApproval}
              style={{
                background: themeColor,
              }}
              className="bg-black text-white rounded-md p-1 px-4 font-medium "
            >
              Request Approval
            </button>
          </div>
        </div>
      </div>
    </ModalWrapper>
  )
}

export default ApprovalModal
