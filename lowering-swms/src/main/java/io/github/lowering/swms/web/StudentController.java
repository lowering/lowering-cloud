package io.github.lowering.swms.web;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import io.github.lowering.swms.service.StudentService;

@Controller
@RequestMapping("/students")
public class StudentController {

	@Autowired
	private StudentService studentService;
	
	@GetMapping
	public String index(Model model) {
		model.addAttribute("students", this.studentService.findAll());
		return "students/index";
	}
}
