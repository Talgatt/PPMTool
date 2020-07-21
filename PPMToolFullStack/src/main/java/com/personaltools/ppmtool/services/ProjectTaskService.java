package com.personaltools.ppmtool.services;

import com.personaltools.ppmtool.domain.Backlog;
import com.personaltools.ppmtool.domain.ProjectTask;
import com.personaltools.ppmtool.repositories.BacklogRepository;
import com.personaltools.ppmtool.repositories.ProjectTaskRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskService {

    @Autowired
    private BacklogRepository backlogRepository;

    @Autowired
    private ProjectTaskRepository projectTaskRepository;

    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask){

        // PTs to be added to a specific project, project != null, BL exists
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);

        // set the backlog to PT
        projectTask.setBacklog(backlog);

        // we want our project sequence to be like this: IDPRO-1 IDPRO-2
        Integer BacklogSequence = backlog.getPTSequence();

        // Update the BL SEQUENCE
        BacklogSequence++;

        // Add Sequence to Project Task
        projectTask.setProjectSequence(projectIdentifier+"-"+BacklogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);

        // INITIAL priority when priority is null
        if(projectTask.getPriority()==null){
            projectTask.setPriority(3);
        }
        // INITIAL status when status is null
        if(projectTask.getStatus()=="" || projectTask.getStatus()==null){
            projectTask.setStatus("TO_DO");
        }


        return projectTaskRepository.save(projectTask);



    }

}
