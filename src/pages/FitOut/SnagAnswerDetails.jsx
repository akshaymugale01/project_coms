import { useEffect, useState } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import {
  CheckCircle2,
  FileText,
  HelpCircle,
  ArrowLeft,
  Image,
  Eye,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardHeader,
  Typography,
  Button,
  Chip,
  Box,
  Grid,
  Paper,
} from "@mui/material";
import {
  getSnagAnswer,
  getSnagAnswersByResource,
  getSnagChecklistByCategory,
  getSnagChecklistID,
} from "../../api";
import toast from "react-hot-toast";
import PropTypes from "prop-types";

const SnagAnswerDetails = ({
  resourceId: propResourceId,
  isModal = false,
  checklistId: propChecklistId,
}) => {
  const navigate = useNavigate();
  const [checklistData, setChecklistData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAnswers, setLoadingAnswers] = useState(true);
  const [searchParams] = useSearchParams();
  const [answers, setAnswers] = useState([]);
//   const { id } = useParams();
//   const searchChecklistId = searchParams.get("checklist_id");
  const resourceId = propResourceId || searchParams.get("resource_id");
//   const checklistId = propChecklistId || searchChecklistId || id;

  useEffect(() => {
    const fetchSNAGQ = async (categoryId) => {
      try {
        setLoading(true);
        const response = await getSnagChecklistByCategory(categoryId);
        console.log(
          "Fetched via Ransack (Category ID):",
          categoryId,
          response.data
        );

        // Extract the first checklist object from the array
        if (Array.isArray(response.data) && response.data.length > 0) {
          setChecklistData(response.data[0]);
          console.log("Using first checklist:", response.data[0]);
        } else {
          console.error("No checklist found in response array");
          setChecklistData(null);
          toast.error("No checklist found for this category");
        }
      } catch (error) {
        console.error("Error fetching Snag Checklists:", error);
        setChecklistData(null);
      } finally {
        setLoading(false);
      }
    };

    if (resourceId) {
      console.log("Fetching by resourceId (category):", resourceId);
      fetchSNAGQ(resourceId);
    }
  }, [resourceId]);

  useEffect(() => {
    const fetchAnswers = async () => {
      try {
        setLoadingAnswers(true);
        if (resourceId) {
          const response = await getSnagAnswersByResource(resourceId);
          console.log("Answer response", response);
          setAnswers(response.data || []);
        }
      } catch (error) {
        console.error("Error fetching answers:", error);
        toast.error("Failed to load submission answers");
      } finally {
        setLoadingAnswers(false);
      }
    };

    fetchAnswers();
  }, [resourceId]);

  console.log("answers", answers);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  console.log("checklist data: ", checklistData);

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

  const renderQuestionView = (question) => {
    // Find the submitted answer for this question from the fetched answers
    const submittedAnswer = Array.isArray(answers)
      ? answers.find((answer) => answer.question_id === question.id)
      : null;

    const fieldValue = submittedAnswer
      ? submittedAnswer.ans_descr ||
        submittedAnswer.comments ||
        "No answer provided"
      : "No answer provided";

    return (
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
          Answer:
        </Typography>
        <Paper
          sx={{
            p: 2,
            bgcolor: submittedAnswer ? "grey.50" : "grey.100",
            border: "1px solid",
            borderColor: submittedAnswer ? "grey.200" : "grey.300",
          }}
        >
          <Typography
            variant="body1"
            color={submittedAnswer ? "text.primary" : "text.secondary"}
            sx={{ fontStyle: submittedAnswer ? "normal" : "italic" }}
          >
            {fieldValue}
          </Typography>

          {submittedAnswer && (
            <Box
              sx={{
                mt: 2,
                pt: 2,
                borderTop: "1px solid",
                borderColor: "grey.300",
              }}
            >
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Answer Type: {submittedAnswer.answer_type}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Answer Mode: {submittedAnswer.answer_mode}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="caption" color="text.secondary">
                    Submitted By: {submittedAnswer.user_name}
                  </Typography>
                </Grid>
                {submittedAnswer.created_at && (
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Submitted: {formatDate(submittedAnswer.created_at)}
                    </Typography>
                  </Grid>
                )}
                {submittedAnswer.quest_option_id && (
                  <Grid item xs={12}>
                    <Typography variant="caption" color="text.secondary">
                      Option ID: {submittedAnswer.quest_option_id}
                    </Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          )}
        </Paper>
      </Box>
    );
  };

  return (
    <div>
      <Box
        sx={{
          minHeight: isModal ? "auto" : "100vh",
          bgcolor: isModal ? "transparent" : "grey.50",
          p: isModal ? 2 : 3,
        }}
      >
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
                <Typography variant="h6">
                  Loading submission details...
                </Typography>
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
                      {checklistData.name} - Submission Details
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
                      icon={<Eye size={16} />}
                      label="View Mode"
                      color="info"
                      variant="filled"
                    />
                  </Box>
                </Box>
              </>
            )}
          </Box>

          {!loading && checklistData && (
            <>
              {/* Submission Summary */}
              <Card sx={{ mb: 3 }}>
                <CardHeader>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <FileText size={20} color="#1976d2" />
                    Submission Summary
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
                        Checklist Information
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
                            Total Questions:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {checklistData.total_questions}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Answered:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {answers ? answers.length : 0}
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
                        Resource Information
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
                            Resource ID:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            {resourceId}
                          </Typography>
                        </Box>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <Typography variant="body2" color="text.secondary">
                            Resource Type:
                          </Typography>
                          <Typography variant="body2" fontWeight="medium">
                            FitoutRequestCategory
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
                        <CheckCircle2 size={16} color="#4caf50" />
                        <Typography variant="body2" fontWeight="medium">
                          Submitted
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Typography
                        variant="subtitle1"
                        fontWeight="semibold"
                        color="text.primary"
                        sx={{ mb: 1 }}
                      >
                        Details
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Submitted By:
                      </Typography>
                      <Typography variant="body2" fontWeight="medium">
                        {answers.length > 0 ? answers[0].user_name : "Unknown"}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              {/* Questions and Answers */}
              <Card sx={{ mb: 3 }}>
                <CardHeader>
                  <Typography
                    variant="h6"
                    component="div"
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <HelpCircle size={20} color="#1976d2" />
                    Questions & Answers
                  </Typography>
                </CardHeader>
                <CardContent>
                  {loadingAnswers ? (
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        minHeight: "200px",
                      }}
                    >
                      <Typography variant="h6">Loading answers...</Typography>
                    </Box>
                  ) : (
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
                            bgcolor: "background.paper",
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
                                  bgcolor: "#1976d2",
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

                          <Typography
                            variant="h6"
                            component="div"
                            sx={{ mb: 2, fontWeight: "medium" }}
                          >
                            {question.descr}
                          </Typography>
                          {renderQuestionView(question)}
                        </Paper>
                      ))}
                    </Box>
                  )}
                </CardContent>
              </Card>
            </>
          )}
        </Box>
      </Box>
    </div>
  );
};

SnagAnswerDetails.propTypes = {
  resourceId: PropTypes.string,
  isModal: PropTypes.bool,
  checklistId: PropTypes.string,
};

SnagAnswerDetails.defaultProps = {
  resourceId: null,
  isModal: false,
  checklistId: null,
};

export default SnagAnswerDetails;
