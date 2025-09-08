package com.store.storefront.utils;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.Map;

@RestControllerAdvice
 //handles all custom validation exceptions in the program
public class GlobalValidationManager extends ResponseEntityExceptionHandler{ //handles all the validation errors in the codebase
    @Override
    protected ResponseEntity<Object> handleMethodArgumentNotValid(
            MethodArgumentNotValidException ex, // error details
            HttpHeaders headers,                // error headers
            HttpStatusCode status,                // http status
            WebRequest request){				// web request that threw the exception

        Map<String,String> errors = new HashMap<>();

        ex.getBindingResult().getFieldErrors().forEach(error -> {	//For all the errors in the fields
            String field = error.getField();						//get the field name
            String message = error.getDefaultMessage();				//get the error default message
            errors.put(field,message);								//store the errors
        });

        Map<String,Object> body = new LinkedHashMap<>();
        body.put("status", status.value());							//put the http status
        body.put("errors", errors);									//and the errors in the response body
        return ResponseEntity.status(status).body(body);			//return the response
        }
    }
