package com.notes.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.notes.entity.Notes;
import com.notes.service.NotesService;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/note")
public class NotesController {

	@Autowired
	private NotesService noteService;

	@PostMapping("/postnote")
	public Notes saveNotes(@RequestBody Notes n) {
		return noteService.saveNotes(n);
	}

	@GetMapping("/getallnotes")
//	public List<Notes> getAllNotes() {
//		return noteService.getAllNotes();
//	}
	public ResponseEntity<Map<String, Object>> getAllNotes() {
	    List<Notes> notes = noteService.getAllNotes();
	    
	    Map<String, Object> response = new HashMap<>();
	    response.put("status", 200);
	    response.put("body", notes);
	    
	    return ResponseEntity.ok(response);
	}


	@GetMapping("/getnotebyid/{id}")
	public Notes noteById(@PathVariable long id) {
		return noteService.getById(id);

	}

	@PutMapping("/editnote/{id}")
	public Notes updateNotes(@PathVariable long id, @RequestBody Notes n) {
		return noteService.updateNotes(n, id);

	}

	@DeleteMapping("/deletenote/{id}")
	public void remove(@PathVariable long id) {
		noteService.removeNotes(id);
		System.out.println("Successfull");
	}
}
