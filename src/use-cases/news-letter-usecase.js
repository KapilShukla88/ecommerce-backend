/**
 *
 * @param {*} options {subject, message,etc.}
 * @param {*} emailService
 * @returns `success message`
 */
const sendNewsLetterUseCase = async (options, { emailService }) => {
  const response = await emailService.sendEmail(options);

  return response;
};

export { sendNewsLetterUseCase };
