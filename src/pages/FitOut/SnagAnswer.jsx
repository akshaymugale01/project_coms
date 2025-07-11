import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  FileText,
  HelpCircle,
  ArrowLeft,
  X,
  Image,
  Send,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Chip,
  Box,
  Grid,
  FormHelperText,
  Paper,
} from "@mui/material";
import { getSnagChecklistID, postSnagAnswer } from "../../api";
import { getItemInLocalStorage } from "../../utils/localStorage";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const SnagAnsweDetails = ({ 
  resourceId: propResourceId, 
  onClose, 
  isModal = false, 
  checklistId: propChecklistId,
  isViewMode = false,
  submittedData = null,
  onSubmissionComplete
}) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [checklistData, setChecklistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchParams] = useSearchParams();

  const { id } = useParams();
  const resourceId = propResourceId || searchParams.get('resource_id'); // Use prop first, then URL param
  const checklistId = propChecklistId || id; // Use prop checklistId first, then URL param id
  console.log("URL id", id);
  console.log("resourceId", resourceId);
  console.log("checklistId", checklistId);

  useEffect(() => {
    const fetchSNAGQ = async (checklistIdParam) => {
      try {
        setLoading(true);
        const response = await getSnagChecklistID(checklistIdParam);
        console.log("data", response);
        setChecklistData(response.data);
      } catch (error) {
        console.error("ERRRRRR", error);
      } finally {
        setLoading(false);
      }
    };

    if (checklistId) {
      fetchSNAGQ(checklistId);
    }
  }, [checklistId]);

  // Populate form with submitted data when in view mode
  useEffect(() => {
    if (isViewMode && submittedData && checklistData) {
      const populatedFormData = {};
      
      if (Array.isArray(submittedData)) {
        submittedData.forEach((answer) => {
          if (answer.question_id) {
            const fieldName = `question_${answer.question_id}`;
            populatedFormData[fieldName] = answer.ans_descr || answer.comments || "";
          }
        });
      }
      
      setFormData(populatedFormData);
      console.log("Populated form data:", populatedFormData);
    }
  }, [isViewMode, submittedData, checklistData]);


  const handleSubmit = async () => {
    try {
      setSubmitting(true);
      
      // Get user data from localStorage
      const userId = getItemInLocalStorage("UserId") || getItemInLocalStorage("VIBEUSERID");
      const companyId = getItemInLocalStorage("COMPANYID");
      
      if (!userId || !companyId) {
        toast.error("Missing user or company information. Please log in again.");
        return;
      }

      if (!resourceId) {
        toast.error("Missing resource information. Please navigate from the request details page.");
        return;
      }

      if (!checklistId) {
        toast.error("Missing checklist information. Please try again.");
        return;
      }

      // Prepare answers for submission
      const answers = [];
      
      checklistData.questions?.forEach((question) => {
        const fieldName = `question_${question.id}`;
        const fieldValue = formData[fieldName];
        
        if (fieldValue && fieldValue.trim() !== "") {
          let answerData = {
            question_id: question.id,
            user_id: userId,
            company_id: companyId,
            checklist_id: checklistData.id,
            answer_type: question.qtype,
            answer_mode: "form", // Could be "form" or "draft"
            comments: fieldValue,
            resource_id: resourceId || "", // Use FitoutRequestCategory ID from URL
            resource_type: "FitoutRequestCategory"
          };

          // Handle different question types
          if (question.qtype === "Multiple Choice") {
            // Find the option that matches the selected value
            const selectedOption = question.options?.find(opt => opt.qname === fieldValue);
            if (selectedOption) {
              answerData.quest_option_id = selectedOption.id;
              answerData.ans_descr = selectedOption.qname;
            }
          } else if (question.qtype === "Yes/No") {
            answerData.ans_descr = fieldValue;
          } else {
            // Text type
            answerData.ans_descr = fieldValue;
          }
          
          answers.push(answerData);
        }
      });

      if (answers.length === 0) {
        toast.warning("Please answer at least one question before submitting.");
        return;
      }

      // Submit answers one by one (or adjust based on API requirements)
      for (const answer of answers) {
        await postSnagAnswer({ snag_answer: answer });
      }

      toast.success(`Form submitted successfully for Category ID: ${resourceId}!`);
      
      if (isModal && onClose) {
        // Close modal if in modal mode
        setTimeout(() => {
          onClose();
        }, 1500); // Give user time to see success message
      } else {
        // Navigate back if not in modal mode
        navigate("/fitout/request/list");
      }
      
    } catch (error) {
      console.error("Error submitting form:", error);
      toast.error("Error submitting form. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getQuestionTypeIcon = (qtype) => {
    switch (qtype) {
      case "Yes/No":
        return <CheckCircle2 size={16} />;
      case "Text":
        return <FileText size={16} />;
      case "Multiple Choice":
        return <HelpCircle size={16} />;
      default:
        return <HelpCircle size={16} />;
    }
  };

  const getQuestionTypeBadgeColor = (qtype) => {
    switch (qtype) {
      case "Yes/No":
        return "success";
      case "Text":
        return "primary";
      case "Multiple Choice":
        return "secondary";
      default:
        return "default";
    }
  };

  const handleInputChange = (fieldName, value) => {
    setFormData((prev) => ({
      ...prev,
      [fieldName]: value,
    }));

    // Clear error when user starts typing
    if (errors[fieldName]) {
      setErrors((prev) => ({
        ...prev,
        [fieldName]: null,
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    checklistData.questions?.forEach((question) => {
      const fieldName = `question_${question.id}`;
      if (
        question.quest_mandatory &&
        (!formData[fieldName] || formData[fieldName].trim() === "")
      ) {
        newErrors[fieldName] = "This field is required";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderQuestionInput = (question) => {
    const fieldName = `question_${question.id}`;
    const fieldValue = formData[fieldName] || "";

    switch (question.qtype) {
      case "Multiple Choice":
        return (
          <FormControl fullWidth error={!!errors[fieldName]} sx={{ mt: 2 }}>
            <InputLabel>
              {question.descr} {question.quest_mandatory && "*"}
            </InputLabel>
            <Select
              value={fieldValue}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
              label={`${question.descr} ${question.quest_mandatory ? "*" : ""}`}
            >
              {question.options?.map((option) => (
                <MenuItem key={option.id} value={option.qname}>
                  {option.qname}
                </MenuItem>
              ))}
            </Select>
            {errors[fieldName] && (
              <FormHelperText>{errors[fieldName]}</FormHelperText>
            )}
          </FormControl>
        );

      case "Text":
        return (
          <TextField
            fullWidth
            multiline
            rows={4}
            label={`${question.descr} ${question.quest_mandatory ? "*" : ""}`}
            placeholder="Enter your response..."
            value={fieldValue}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
            error={!!errors[fieldName]}
            helperText={errors[fieldName]}
            sx={{ mt: 2 }}
          />
        );

      case "Yes/No":
        return (
          <FormControl fullWidth error={!!errors[fieldName]} sx={{ mt: 2 }}>
            <InputLabel>
              {question.descr} {question.quest_mandatory && "*"}
            </InputLabel>
            <Select
              value={fieldValue}
              onChange={(e) => handleInputChange(fieldName, e.target.value)}
              label={`${question.descr} ${question.quest_mandatory ? "*" : ""}`}
            >
              <MenuItem value="yes">Yes</MenuItem>
              <MenuItem value="no">No</MenuItem>
            </Select>
            {errors[fieldName] && (
              <FormHelperText>{errors[fieldName]}</FormHelperText>
            )}
          </FormControl>
        );

      default:
        return (
          <TextField
            fullWidth
            label={`${question.descr} ${question.quest_mandatory ? "*" : ""}`}
            placeholder="Enter your response..."
            value={fieldValue}
            onChange={(e) => handleInputChange(fieldName, e.target.value)}
            error={!!errors[fieldName]}
            helperText={errors[fieldName]}
            sx={{ mt: 2 }}
          />
        );
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    if (validateForm()) {
      console.log("Form validated, submitting...");
      await handleSubmit();
    }
  };

  return (
    <div>
      <Box sx={{ 
        minHeight: isModal ? "auto" : "100vh", 
        bgcolor: isModal ? "transparent" : "grey.50", 
        p: isModal ? 2 : 3 
      }}>
        <Box sx={{ maxWidth: "4xl", mx: "auto" }}>
          {/* Header */}
          <Box sx={{ mb: 3 }}>
            {!isModal && (
              <Button
                variant="text"
                onClick={() => navigate("/fitout/request/list")}
                startIcon={<ArrowLeft size={16} />}
                sx={{ mb: 2, color: "text.secondary" }}
              >
                Back to Dashboard
              </Button>
            )}

            {loading ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "200px",
                }}
              >
                <Typography variant="h6">Loading checklist...</Typography>
              </Box>
            ) : !checklistData ? (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  minHeight: "200px",
                }}
              >
                <Typography variant="h6" color="error">
                  Checklist not found
                </Typography>
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h3"
                      component="h1"
                      fontWeight="bold"
                      color="text.primary"
                      sx={{ mb: 1 }}
                    >
                      {checklistData.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Checklist ID: #{checklistData.id} •{" "}
                      {checklistData.total_questions} Questions
                      {resourceId && (
                        <>
                          {" • "}
                          <Chip 
                            label={`Category ID: ${resourceId}`} 
                            size="small" 
                            color="primary" 
                            variant="outlined"
                          />
                        </>
                      )}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <Chip
                      label={checklistData.active ? "Active" : "Inactive"}
                      color={checklistData.active ? "success" : "default"}
                      variant={checklistData.active ? "filled" : "outlined"}
                    />
                  </Box>
                </Box>
              </>
            )}
          </Box>

          {!loading && checklistData && (
            <>
              {/* Checklist Overview */}
              <Card sx={{ mb: 3 }}>
                <CardHeader>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <FileText size={20} color="#d32f2f" />
                    Checklist Overview
                  </Typography>
                </CardHeader>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12} md={4}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="semibold"
                        color="text.primary"
                        sx={{ mb: 1 }}
                      >
                        Basic Information
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Category ID:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {checklistData.snag_audit_category_id}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Site ID:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {checklistData.site_id}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Total Questions:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {checklistData.total_questions}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="semibold"
                        color="text.primary"
                        sx={{ mb: 1 }}
                      >
                        Timestamps
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                        }}
                      >
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Created:
                          </Typography>
                          <Typography variant="caption" fontWeight="medium">
                            {formatDate(checklistData.created_at)}
                          </Typography>
                        </Box>
                        <Box>
                          <Typography variant="body2" color="text.secondary">
                            Updated:
                          </Typography>
                          <Typography variant="caption" fontWeight="medium">
                            {formatDate(checklistData.updated_at)}
                          </Typography>
                        </Box>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={4}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="semibold"
                        color="text.primary"
                        sx={{ mb: 1 }}
                      >
                        Status
                      </Typography>
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        {checklistData.active ? (
                          <CheckCircle2 size={16} color="#4caf50" />
                        ) : (
                          <X size={16} color="#f44336" />
                        )}
                        <Typography variant="body2" fontWeight="medium">
                          {checklistData.active ? "Active" : "Inactive"}
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Dynamic Form */}
              <Card sx={{ mb: 3 }}>
                <CardHeader>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <HelpCircle size={20} color="#d32f2f" />
                    Checklist Form
                  </Typography>
                </CardHeader>
                <CardContent>
                  <form onSubmit={onSubmit}>
                    <Box
                      sx={{ display: "flex", flexDirection: "column", gap: 3 }}
                    >
                      {checklistData.questions?.map((question) => (
                        <Paper
                          key={question.id}
                          sx={{
                            p: 3,
                            border: "1px solid",
                            borderColor: "grey.300",
                          }}
                        >
                          <Box
                            sx={{
                              display: "flex",
                              alignItems: "flex-start",
                              justifyContent: "space-between",
                              mb: 2,
                            }}
                          >
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              <Chip
                                label={`Q${question.qnumber}`}
                                sx={{
                                  bgcolor: "#d32f2f",
                                  color: "white",
                                  fontWeight: "medium",
                                }}
                              />
                              <Chip
                                icon={getQuestionTypeIcon(question.qtype)}
                                label={question.qtype}
                                color={getQuestionTypeBadgeColor(
                                  question.qtype
                                )}
                                variant="outlined"
                              />
                            </Box>
                            <Box
                              sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 1,
                              }}
                            >
                              {question.quest_mandatory && (
                                <Chip
                                  label="Required"
                                  color="error"
                                  size="small"
                                  variant="outlined"
                                />
                              )}
                              {question.img_mandatory && (
                                <Chip
                                  icon={<Image size={12} />}
                                  label="Image Required"
                                  color="default"
                                  size="small"
                                  variant="outlined"
                                />
                              )}
                            </Box>
                          </Box>

                          {renderQuestionInput(question)}
                        </Paper>
                      ))}

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "flex-end",
                          gap: 2,
                          mt: 3,
                        }}
                      >
                        {/* <Button variant="outlined" color="inherit" onClick={onSaveDraft}>
                        Save Draft
                      </Button> */}
                        <Button
                          type="submit"
                          variant="contained"
                          disabled={submitting}
                          sx={{
                            bgcolor: "#d32f2f",
                            "&:hover": { bgcolor: "#b71c1c" },
                          }}
                          startIcon={<Send size={16} />}
                        >
                          {submitting ? "Submitting..." : "Submit Form"}
                        </Button>
                      </Box>
                    </Box>
                  </form>
                </CardContent>
              </Card>
            </>
          )}
        </Box>
      </Box>
    </div>
  );
};

SnagAnsweDetails.propTypes = {
  resourceId: PropTypes.string,
  onClose: PropTypes.func,
  isModal: PropTypes.bool,
  checklistId: PropTypes.string,
};

SnagAnsweDetails.defaultProps = {
  resourceId: null,
  onClose: null,
  isModal: false,
  checklistId: null,
};

export default SnagAnsweDetails;
