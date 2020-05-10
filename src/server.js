import express, { response } from 'express';
import ResumeService from './ResumeService';

const app = express();
const resumeService = new ResumeService();

app.get('/resume/:version', async function (request, response) {
    console.log(`Recvied GET request with version ${request.params.version}`);
    try {
        const resume = await resumeService.get(request.params.version);
        (resume != null) ?
            response.status(200).json(resume) : 
            response.status(404).end();
    } catch (error) {
        console.log(error);
        response.status(500).end('Something Wrong');
    }
});

app.listen(8080, () => console.log('Listening on port 8080'));

export default app;