package com.notes.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.notes.entity.Notes;
import com.notes.exception.ResourceNotFoundException;
import com.notes.repository.NotesRepository;

@Service
public class NotesService {

	@Autowired
	private NotesRepository notesRepo;
	
	public Notes saveNotes(Notes n)
	{
		return notesRepo.save(n);	
	}
	
	public List<Notes> getAllNotes()
	{
		return notesRepo.findAll();
	}
	
	public Notes getById(long id)
	{
		
		return notesRepo.findById(id).orElseThrow(()->new ResourceNotFoundException("unable to find "+ id));
		
	}
	
	public void removeNotes(long id)
	{
		Notes n = getById(id);
	 notesRepo.delete(n);
	}
	
	public Notes updateNotes(Notes n , long id)
	{
		Notes note = getById(id);
		note.setTitle(n.getTitle());
		note.setContent(n.getContent());
		
		  
		return saveNotes(note);
	}
	
}
