export const getErrorDetailMessage = (
  validationResult: { path: String; msg: String }[]
) => {
  return validationResult.map((rm: { path: String; msg: String }) => {
    return { field: rm?.path, message: rm.msg };
  });
};
