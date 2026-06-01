# M6_AdvanceWer_ActividadClase_AnalisisCodigoFrancisco

## Backend Spring Boot

**Main Problems**

- MetricRequestDTO.java is unused and unnecessary because the frontend does not need a data transfer objects to send requests to the backend. This file should be deleted
- MetricResponseDTO.java is duplicated in the folders model and repository. Only the one in model is needed and used, the other should be deleted.
- Data is currently hard written in the repository.java. It should be accessed through a database.

## Frontend React

- Application does not use the other metrics of the api.
- Front doesnt use Useeffect, if the fetch takes longer than expected the render of the graph could fail
