package com.notes.exception;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@ControllerAdvice
public class GlobalExceptionalHandler {

	@ExceptionHandler(ResourceNotFoundException.class)
	public ResponseEntity<?> handleresouceNotFound(ResourceNotFoundException ex) {
		Map<String, Object> error = new HashMap<>();
		error.put("timestamp", LocalDateTime.now());
		error.put("status", HttpStatus.NOT_FOUND.value());
		error.put("error", "not found");
		error.put("message", ex.getMessage());

		return new ResponseEntity<>(error, HttpStatus.NOT_FOUND);
	}

	@ExceptionHandler(Exception.class)
	public ResponseEntity<?> handleAllException(Exception ex) {
		Map<String, Object> error = new HashMap<>();
		error.put("timestamp", LocalDateTime.now());
		error.put("status", HttpStatus.INTERNAL_SERVER_ERROR.value());
		error.put("error", "InternalServerError");
		error.put("message", ex.getMessage());
		
		return new  ResponseEntity<>(error,HttpStatus.INTERNAL_SERVER_ERROR);

	}
}
