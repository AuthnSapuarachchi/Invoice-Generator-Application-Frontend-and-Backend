package in.authn.InvoiceGenerater.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@Service
@RequiredArgsConstructor
@Slf4j
public class EmailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.properties.mail.smtp.from}")
    private String fromEmail;

    public void sendInvoiceEmail(String toEmail, MultipartFile file) throws MessagingException, IOException {
        log.info("Preparing to send email to: {} with attachment: {}", toEmail, file.getOriginalFilename());

        try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

            helper.setFrom(fromEmail);
            helper.setTo(toEmail);
            helper.setSubject("Your Invoice from Quick Invoice");

            String emailBody = "Dear Customer,\n\n" +
                    "Thank you for your business!\n\n" +
                    "Please find attached your invoice.\n\n" +
                    "If you have any questions, please don't hesitate to contact us.\n\n" +
                    "Best regards,\n" +
                    "Quick Invoice Team";

            helper.setText(emailBody);

            String fileName = "invoice_" + System.currentTimeMillis() + ".pdf";
            helper.addAttachment(fileName, new ByteArrayResource(file.getBytes()));

            log.info("Sending email...");
            mailSender.send(message);
            log.info("Email sent successfully to: {}", toEmail);

        } catch (MessagingException e) {
            log.error("MessagingException while sending email: ", e);
            throw new MessagingException("Failed to create or send email message: " + e.getMessage(), e);
        } catch (IOException e) {
            log.error("IOException while reading file: ", e);
            throw new IOException("Failed to read PDF file: " + e.getMessage(), e);
        } catch (Exception e) {
            log.error("Unexpected error while sending email: ", e);
            throw new RuntimeException("Unexpected error while sending email: " + e.getMessage(), e);
        }
    }
}
