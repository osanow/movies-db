# movies-db

**LIVE:** *https://movies-db-netg.herokuapp.com/*

Main stack: Node.js / Mongoose




App is dockerized, so can be simply build *(use build.sh script)* and run *(use run.sh script)*.

For development please use: *npm run dev* cmnd




Unit tests: Jest

E2E tests (basic, routes only): Jest + SuperTest



Security features:
  - body size validation - 5kb by default
  - body content validation - property/type validation
  - request type validation - */json
  - request rate limiter -  10req / 30sek per IP




## Little Summary

**Recruitment project** / Dec 24, 2019

Here it is! 

After 3 days of intense development process finally I'm able to show you guys my little, *movies-db* API.

I tried to do my best but unfortunately due to incoming christmass I had limited amount of time for doing so and there is still some minor things to do, however, I hope you will like it just like me when I was developing it. 

Minor things to do that I could see so far:
 - env's util with validation
 - logger util with better formatting, maybe some timestamps
 - more e2e tests for routes
 - Swagger described routes
 - GET endpoint filtering ( queries, paging and so on )
 
 
 ## Technical routes describtion
 
 STATUS CODES : 
 
      Name                              Code                       Default message
      
    ['NotFoundError',                   404,                       'Not Found'],
    
    ['BadRequestError',                 400,                       'Bad Request'],
    
    ['InvalidContentTypeError',         415,                       'Invalid Content Type'],
    
    ['ExternalServiceUnavailableError', 503,                       'External Service Unavailable'],
    
    ['ExistentError',                   409,                       'Already Exists'],
    
    ['TooManyRequestsError',            429,                       'Too Many Requests']
    
 
**POST   ' /movies '**
 
    PARAMS:
    
    QUERY:
    
    BODY:
    
      required |     title or id
      
      optional |     type, year, plot
      
    RESPONSE:
    
      success:  Boolean
      
      message ?:  String   |  on error only
                  
      movie ?:   just created movie  |   on success only
      
      error ?: *(development only)*  404 | 400 | 415 | 503 | 409 | 429
      
      stack ?: *(development only)*  String
      
      details ?: *(development only)*  String
      
**GET    ' /movies '**

    BODY:
    
    PARAMS: 
    
    QUERY:
    
    RESPONSE:
    
      success:  Boolean
      
      message ?:  String   |  on error only
                  
      movies ?:   all existent movies  |   on success only
      
      error ?: *(development only)*  404 | 400 | 415 | 503 | 409 | 429
      
      stack ?: *(development only)*  String
      
      details ?: *(development only)*  String
    
    

**POST   ' /comments '**
 
    PARAMS:
    
    QUERY:
 
    BODY:
    
      required |     author and content
            
    RESPONSE:
    
      success:  Boolean
      
      message ?:  String   |  on error only
                  
      comment ?:   just created comment  |   on success only
      
      error ?: *(development only)*  404 | 400 | 415 | 503 | 409 | 429
      
      stack ?: *(development only)*  String
      
      details ?: *(development only)*  String
      
      
**GET    ' /comments '**

    BODY:
    
    PARAMS: 
    
    QUERY:
    
    RESPONSE:
    
      success:  Boolean
      
      message ?:  String   |  on error only
                  
      comments ?:   all existent comments  |   on success only
      
      error ?: *(development only)*  404 | 400 | 415 | 503 | 409 | 429
      
      stack ?: *(development only)*  String
      
      details ?: *(development only)*  String
      
