package com.personaltools.ppmtool.services;

import com.personaltools.ppmtool.domain.Backlog;
import com.personaltools.ppmtool.domain.Project;
import com.personaltools.ppmtool.exceptions.ProjectIdException;
import com.personaltools.ppmtool.repositories.BacklogRepository;
import com.personaltools.ppmtool.repositories.ProjectRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectService {
    @Autowired
    private ProjectRepository projectRepository;

    @Autowired
    private BacklogRepository backlogRepository;

    public Project saveOrUpdateProject(Project project){
        //Logic

        try{
            String projectId = project.getProjectIdentifier().toUpperCase();
            System.out.println(projectId);
            project.setProjectIdentifier(projectId);

            if(project.getId() == null){
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(projectId);
            }

            if(project.getId() != null) {
                project.setBacklog(backlogRepository.findByProjectIdentifier(projectId));
            }
            return projectRepository.save(project);
        }catch (Exception e){
            throw new ProjectIdException("Project ID '"+project.getProjectIdentifier().toUpperCase()+"' arleady exists");
        }



    }

    public Project findProjectByIdentifier(String projectId){

        Project project = projectRepository.findByProjectIdentifier((projectId.toUpperCase()));

        if(project == null){
            throw new ProjectIdException("Project ID '"+projectId+"'does not exist");

        }

        return project;
    }

    public Iterable<Project> findAllProjects(){

        return projectRepository.findAll();
    }

    public void deleteProjectByIdentifier(String projectId){
        Project project = projectRepository.findByProjectIdentifier(projectId.toUpperCase());

        if(project == null){
            throw new ProjectIdException("Cannot delete project with ID '"+projectId+"'. This project does not exist");
        }

        projectRepository.delete(project);
    }


}
