
const SAMPLE_TEXT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla hendrerit risus at quam suscipit, ac volutpat risus sollicitudin. Sed semper neque risus. Praesent sollicitudin lobortis nisi, sit amet accumsan nisi accumsan eu. Morbi hendrerit varius nibh ac varius. Maecenas luctus ultricies elit in vestibulum. Donec fermentum sem quis dui euismod, a cursus velit gravida. Aliquam blandit diam nec sagittis luctus. Duis a velit non felis vestibulum convallis. Etiam tristique tempor lectus vitae vestibulum. Suspendisse eu fermentum erat, eu suscipit mauris. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Nam ac gravida sapien, porta convallis nisl.";
const SAMPLE_TEXT_SHORT = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";
const commandPrefix = "guest@henriqueflee.com: ";

var commandLine;
var terminalOutput;

var commandList;
var colorPalette;

var banner_txts;
var banner_breaks;

var media_txt;
var media_breaks;

var help_txt;
var help_txts;
var help_breaks;

var intro_txts;
var intro_breaks;

var skills_txts;
var skills_breaks;

var education_txt;
var education_breaks;

var projects_txt;
var projects_breaks;
var projects_txts;

var lav_txt;
var lav_breaks;

var about_txt;
var about_txts;
var about_breaks;

var return_txt;


//PREC: i <= end_indx
//only works with single color text
function typing_basic(text,end_indx,elem,step,i,delayedinput=null){ 

    if(i<text.length){

        elem.innerHTML += text.charAt(i);
        //elem.scrollTop = elem.scrollHeight;
        window.scrollTo(0, document.body.scrollHeight);
        i++;
        setTimeout(function(){
            typing(text,end_indx,elem,step,i,delayedinput);
        }
        ,step);
    }
    else{
        if(delayedinput != null){
            delayedinput.readOnly = false;
            delayedinput.focus();
        }
    }
    
}

//breaks entry will be formatted [end_indx,style_class]
function typing(text,para,span,i,breaks,bi,step,delayedinput=null){

    if(i == (breaks[bi][0] >= 0 ? breaks[bi][0]:-breaks[bi][0])){
        
        bi++;

        if(bi == breaks.length){
            
            if(delayedinput != null){
                delayedinput.readOnly = false;
                delayedinput.focus();
            }
            
            return;
        }
        else{

            if(breaks[bi][0] >=0){

                span = document.createElement("span");
                span.classList.add(breaks[bi][1]);
                para.appendChild(span);

            }
            else{

                
                span = document.createElement("a");
                span.classList.add(breaks[bi][1]);
                span.href = breaks[bi][2];
                span.target = "_blank";
                para.appendChild(span);

            }
        }
    
    }

    span.innerHTML+= text.charAt(i);
    window.scrollTo(0, document.body.scrollHeight);

    setTimeout(function(){
        typing(text,para,span,i+1,breaks,bi,step,delayedinput);
    }
    ,step);

}

//breaks entry will be formatted [end_indx,style_class]
//breaks first entry should always be [0,""]
//breaks entire domain should span [0,s.length]
function appendToTerminalOutput_Typed(terminalOutput,text,breaks,step,delayedinput=null){
   
    const newPara = document.createElement("p");
    terminalOutput.appendChild(newPara);
    
    typing(text,newPara,null,0,breaks,0,step,delayedinput);

}

function appendToTerminalOutput_Lines(terminalOutput,lines,breaks,step,delayedinput=null){

    for(let k = 0; k<lines.length-1;k++){

        appendToTerminalOutput_Typed(terminalOutput,lines[k],breaks[k],step,null);

    }

    appendToTerminalOutput_Typed(terminalOutput,lines[lines.length-1],breaks[lines.length-1],step,delayedinput);


}


function appendToTerminalOutput_Flat(terminalOutput,s){

    const newPara = document.createElement("p");
    const prefixSpan = document.createElement("span");
    const commandSpan = document.createElement("span");
    prefixSpan.classList.add("softgreenP");

    commandSpan.classList.add(commandList.has(s) ? "softpurple": "dirtyblueP");

    prefixSpan.innerHTML = commandPrefix;
    commandSpan.innerHTML = s + "\n\n";

    newPara.appendChild(prefixSpan);
    newPara.appendChild(commandSpan);
    terminalOutput.appendChild(newPara);

}

function processInput(inputField,outputField){

    let outputText = inputField.value.toLowerCase().trim();

    if(outputText.length == 0){return;}
    
    inputField.value = "";
    appendToTerminalOutput_Flat(outputField,outputText);

    switch(outputText){

        case "help":
            showHelp();
            break;

        case "a command":
            showHelp();
            break;

        case "about":
            showAbout(true);
            break;

        case "resume":
            showResume();
            break;

        case "education":
            showEducation(true);
            break;

        case "projects":
            showProjects();
            break;

        case "skills":
            showSkills();
            break;

        case "lav":
            showLav(true);
            break;

        case "media":
            showMedia(true);
            break;

        case "reset":
            resetTerminal();
            break;

        case "showall":
            showAll();
            break;

        default:
            showUnknown(outputText);
            break;



    }

}


function initializeFields(){

    terminalOutput = document.getElementById("terminaloutput");
    commandLine = document.getElementById("commandLine");

    commandList = new Set();
    commandList.add("help");
    commandList.add("a command");
    commandList.add("about");
    commandList.add("resume");
    commandList.add("education");
    commandList.add("projects");
    commandList.add("skills");
    commandList.add("lav");
    commandList.add("media");
    commandList.add("showall");
    commandList.add("reset");

    colorPalette = ["ffb347","e5c07b","79b8ff","f97683","b392f0","5abfad","56b6c2"];

    banner_txts = [" __    __   _______ .__   __. .______    __    ______     __    __   _______     _______       __       _______  _______ \n",
                   "|  |  |  | |   ____||  \\ |  | |   _  \\  |  |  /  __  \\   |  |  |  | |   ____|   |   ____|     |  |     |   ____||   ____|\n",
                   "|  |__|  | |  |__   |   \\|  | |  |_)  | |  | |  |  |  |  |  |  |  | |  |__      |  |__        |  |     |  |__   |  |__   \n",
                   "|   __   | |   __|  |  . `  | |      /  |  | |  |  |  |  |  |  |  | |   __|     |   __|       |  |     |   __|  |   __|  \n",
                   "|  |  |  | |  |____ |  |\\   | |  |\\  \\  |  | |  \'--\'  |  |  \'--\'  | |  |____    |  |    __    |  `----.|  |____ |  |____ \n",
                   "|__|  |__| |_______||__| \\__| | _| \\._\\ |__|  \\_____\\__\\  \\______/  |_______|   |__|   (__)   |_______||_______||_______|\n\n"];

    banner_breaks = [[[0,""],[banner_txts[0].length,"pureblue"]],
                     [[0,""],[banner_txts[1].length,"pureblue"]],
                     [[0,""],[banner_txts[2].length,"pureblue"]],
                     [[0,""],[banner_txts[3].length,"pureblue"]],
                     [[0,""],[banner_txts[4].length,"pureblue"]],
                     [[0,""],[banner_txts[5].length,"pureblue"]]];

    /*

    help_txt = "help\n" + 
               "   - Lists detailed view of each command\n\n"+
               "about\n"+
               "   - Information regarding my background\n\n"+
               "education\n"+
               "   - Relevant coursework, attended institutions, etc\n\n"+
               "projects\n"+
               "   - Personal Computer Science ventures\n\n"+
               "skills\n"+
               "   - My toolkit\n\n"+
               "lav\n"+
               "   - Leadership and Volunteerism\n\n"+
               "media\n"+
               "   - My media profiles\n\n"+
               "showall\n"+
               "   - Display all content\n\n"+
               "reset\n"+
               "   - Reset the terminal\n\n"+
               "Type a command and press enter to explore!\n\n";

    help_breaks = [[0,""],
                   [4,"softpurple"],
                   [45,"softgoldP"],
                   [52,"softpurple"],
                   [93,"softgoldP"],
                   [108,"softpurple"],
                   [157,"softgoldP"],
                   [170,"softpurple"],
                   [208,"softgoldP"],
                   [217,"softpurple"],
                   [231,"softgoldP"],
                   [236,"softpurple"],
                   [271,"softgoldP"],
                   [276,"softpurple"],
                   [301,"softgoldP"],
                   [310,"softpurple"],
                   [335,"softgoldP"],
                   [340,"softpurple"],
                   [371,"softgoldP"],
                   [381,"softpurple"],
                   [390,"softgoldP"],
                   [396,"pureblue"],
                   [help_txt.length,"softgoldP"]];

    */


    help_txts = ["help\n" , 
                 "   - Lists detailed view of each command\n\n",
                 "about\n",
                 "   - Information regarding my background\n\n",
                 "resume\n",
                 "   - View my resume in a new tab\n\n",
                 "education\n",
                 "   - Relevant coursework, attended institutions, etc\n\n"+
                 "projects\n"+
                 "   - Research and personal Computer Science ventures\n\n"+
                 "skills\n"+
                 "   - My toolkit\n\n"+
                 "lav\n"+
                 "   - Leadership and Volunteerism\n\n"+
                 "media\n"+
                 "   - My media profiles\n\n"+
                 "showall\n"+
                "   - Display all content\n\n"+
                 "reset\n"+
                 "   - Reset the terminal\n\n"+
                 "Type or click a command and press enter to explore!\n\n"];

    help_breaks = [[[0,""],[help_txts[0].length,"softpurple"]],
                   [[0,""],[help_txts[1].length,"softgoldP"]],
                   [[0,""],[help_txts[2].length,"softpurple"]],
                   [[0,""],[help_txts[3].length,"softgoldP"]],
                   [[0,""],[help_txts[4].length,"softpurple"]],
                   [[0,""],[help_txts[5].length,"softgoldP"]],
                   [[0,""],[help_txts[6].length,"softpurple"]],

                   [[0,""],
                    [52,"softgoldP"],
                    [62,"softpurple"],
                    [102,"softgoldP"],
                    [117,"softgoldP"],
                    [123,"softpurple"],
                    [140,"softgoldP"],
                    [144,"softpurple"],
                    [177,"softgoldP"],
                    [184,"softpurple"],
                    [207,"softgoldP"],
                    [216,"softpurple"],
                    [241,"softgoldP"],
                    [248,"softpurple"],
                    [288,"softgoldP"],
                    [297,"softpurple"],
                    [308,"softgoldP"],
                    [313,"pureblue"],
                    [help_txts[7].length,"softgoldP"]]];


            

    intro_txts = [" __    __   _______ .__   __. .______    __    ______     __    __   _______     _______       __       _______  _______ \n",
                  "|  |  |  | |   ____||  \\ |  | |   _  \\  |  |  /  __  \\   |  |  |  | |   ____|   |   ____|     |  |     |   ____||   ____|\n",
                  "|  |__|  | |  |__   |   \\|  | |  |_)  | |  | |  |  |  |  |  |  |  | |  |__      |  |__        |  |     |  |__   |  |__   \n",
                  "|   __   | |   __|  |  . `  | |      /  |  | |  |  |  |  |  |  |  | |   __|     |   __|       |  |     |   __|  |   __|  \n",
                  "|  |  |  | |  |____ |  |\\   | |  |\\  \\  |  | |  '--'  |  |  '--'  | |  |____    |  |    __    |  `----.|  |____ |  |____ \n",
                  "|__|  |__| |_______||__| \\__| | _| \\._\\ |__|  \\_____\\__\\  \\______/  |_______|   |__|   (__)   |_______||_______||_______|\n\n"+
                  "Welcome, here are a list of available commands, type or click a command and press enter to begin exploring:\n\n" + 
                  "help\n" + 
                  "   - Lists detailed view of each command\n\n"+
                  "about\n"+
                  "   - Information regarding my background\n\n"+
                  "resume\n"+
                  "   -  View my resume in a new tab\n\n"+
                  "education\n"+
                  "   - Relevant coursework, attended institutions, etc\n\n"+
                  "projects\n"+
                  "   - Research and personal Computer Science ventures\n\n"+
                  "skills\n"+
                  "   - My toolkit\n\n"+
                  "lav\n"+
                  "   - Leadership and Volunteerism\n\n"+
                  "media\n"+
                  "   - My media profiles\n\n"+
                  "showall\n"+
                  "   - Display all content\n\n"+
                  "reset\n"+
                  "   - Reset the terminal\n\n"];

    intro_breaks = [[[0,""],[intro_txts[0].length,"pureblue"]],
                   [[0,""],[intro_txts[1].length,"pureblue"]],
                   [[0,""],[intro_txts[2].length,"pureblue"]],
                   [[0,""],[intro_txts[3].length,"pureblue"]],
                   [[0,""],[intro_txts[4].length,"pureblue"]],

                   [[0,""],[121,"pureblue"],
                    [185,"softgoldP"],[195,"softpurple"],[205,"softgoldP"],[211,"pureblue"],
                    [231,"softgoldP"],
                    [238,"softpurple"],
                    [279,"softgoldP"],
                    [286,"softpurple"],
                    [327,"softgoldP"],
                    [334,"softpurple"],
                    [367,"softgoldP"],
                    [378,"softpurple"],
                    [433,"softgoldP"],
                    [444,"softpurple"],
                    [494,"softgoldP"],
                    [502,"softpurple"],
                    [518,"softgoldP"],
                    [525,"softpurple"],
                    [556,"softgoldP"],
                    [563,"softpurple"],
                    [586,"softgoldP"],
                    [595,"softpurple"],
                    [620,"softgoldP"],
                    [627,"softpurple"],
                    [intro_txts[5].length,"softgoldP"]]];
    


    media_txt = "Email          henriqueflee816@gmail.com\n\n"+
                "GitHub         HFL816\n\n"+
                "LinkedIn       Henrique F. Lee\n\n"+
                "Instagram      hfl_16\n\n";

    media_breaks = [[0,""],
                    [15,"softgoldP"],
                    [40,"pureblue"],
                    [57,"softgoldP"],
                    [-63,"pureblueU","https://github.com/HFL816"],
                    [80,"softgoldP"],
                    [-95,"pureblueU","https://www.linkedin.com/in/henrique-f-lee-666475256"],
                    [112,"softgoldP"],
                    [-media_txt.length,"pureblueU","https://www.instagram.com/hfl_16/"]]; 

                    //TODO I think 3D modeling game engines and eveloper tools can ve combinedinto one category called developer tools
                    //and from there you can also add a few more like languages and skills like sockets and stuff YOU ALSO NEED to add 
                    //this internship to the experiences 

    skills_txts = ["Programming Languages:                                             Software:                       Engines:\n\n",
                   "            C: ■ ■ ■ ■ ■                                 Media-Pipe: ■ ■ ■ ■ ■                    Unity: ■ ■ ■ ■ ■\n\n",
                   "          C++: ■ ■ ■ ■ ■                                       CUDA: ■ ■ ■ ■ □          Unreal Engine 5: ■ ■ ■ □ □\n\n",
                   "           C#: ■ ■ ■ ■ ■                                     OpenMP: ■ ■ ■ ■ □                                    \n\n",
                   "       Python: ■ ■ ■ ■ ■                                  Socket.io: ■ ■ ■ ■ □                   Languages:\n\n",
                   "         Java: ■ ■ ■ ■ ■                                   React.js: ■ ■ ■ ■ □                  English: Native\n\n",
                   "   Javascript: ■ ■ ■ ■ □                                       .NET: ■ ■ ■ ■ □                  Spanish: Native\n\n",
                   "        OCAML: ■ ■ ■ □ □                                   Firebase: ■ ■ ■ □ □               Portuguese: Native\n\n",
                   "        Swift: ■ ■ ■ □ □                              Github/GitLab: ■ ■ ■ ■ ■                 Mandarin: Advanced\n\n"];

    skills_breaks = [[[0,""],                                                                                    [skills_txts[0].length,"hardgold"]],
                     [[0,""],[15,"softgoldP"],[25,"pureblue"],[68,"softgoldP"],[78,"pureblue"],[104,"softgoldP"],[skills_txts[1].length,"pureblue"]],
                     [[0,""],[15,"softgoldP"],[25,"pureblue"],[68,"softgoldP"],[78,"pureblue"],[104,"softgoldP"],[skills_txts[2].length,"pureblue"]],
                     [[0,""],[15,"softgoldP"],[25,"pureblue"],[68,"softgoldP"],[78,"pureblue"],                  [skills_txts[3].length,"pureblue"]],
                     [[0,""],[15,"softgoldP"],[25,"pureblue"],[68,"softgoldP"],[78,"pureblue"],                  [skills_txts[4].length,"hardgold"]],
                     [[0,""],[15,"softgoldP"],[25,"pureblue"],[68,"softgoldP"],[78,"pureblue"],[104,"softgoldP"],[skills_txts[5].length,"pureblue"]],
                     [[0,""],[15,"softgoldP"],[25,"pureblue"],[68,"softgoldP"],[78,"pureblue"],[104,"softgoldP"],[skills_txts[6].length,"pureblue"]],
                     [[0,""],[15,"softgoldP"],[25,"pureblue"],[68,"softgoldP"],[78,"pureblue"],[104,"softgoldP"],[skills_txts[7].length,"pureblue"]],
                     [[0,""],[15,"softgoldP"],[25,"pureblue"],[68,"softgoldP"],[78,"pureblue"],[104,"softgoldP"],[skills_txts[8].length,"pureblue"]]];

    education_txt = "Carnegie Mellon University, School of Computer Science\n\n"+
                    "Bachelor of Science in Computer Science with Concentrations in Computer Systems and Computer Graphics (Current)\n\n"+
                    "GPA: 3.77\n\n"+
                    "Selected Coursework:\n"+
                    "   -Parallel Computer Architecture (15-418)\n"+
                    "   -Distributed Systems (15-440)\n" +
                    "   -Visual Computing Systems (15-473)\n" + 
                    "   -Parallel and Sequential Data Structures and Algorithms (15-210)\n"+
                    "   -Computer Vision (16-385)\n\n\n"+
                    "Singapore American School\n\n"+
                    "High School Diploma\n\n"+
                    "GPA: 4.3\n\n"+
                    "Leadership:\n"+
                    "   -Educating Children of Hispanic Origin (President)\n"+
                    "   -Computer Science National Honor Society (Co-President)\n"+
                    "   -Computer Science Tutoring (Head Tutor)\n"+
                    "   -Varsity Soccer (Captain)\n\n";

    education_breaks = [[0,""],
                        [54,"hardgold"],
                        [158,"pureblueP"],
                        [167,"softred"],
                        [173,"softgreenP"],
                        [178,"softgoldP"],
                        [200,"dirtyblueP"],
                        [237,"softgoldP"],
                        [-243,"pureblueU","https://courses.scottylabs.org/course/15-418"],
                        [270,"softgoldP"],
                        [-276,"pureblueU","https://courses.scottylabs.org/course/15-440"],
                        [308,"softgoldP"],
                        [-314,"pureblueU","https://courses.scottylabs.org/course/15-473"],
                        [376,"softgoldP"],
                        [-382,"pureblueU","https://courses.scottylabs.org/course/15-210"],
                        [405,"softgoldP"],
                        [-411,"pureblueU","https://courses.scottylabs.org/course/16-385"],
                        [412,"softgoldP"],
                        [441,"hardgold"],
                        [461,"pureblueP"],
                        [467,"softgreenP"],
                        [471,"softgoldP"],
                        [484,"dirtyblueP"],
                        [education_txt.length,"softgoldP"]];

    projects_txts = [
                     "Emulating Context-Intelligent Behavior through Vision and Language Models\n", 
                     "Role: Coauthor and Lead Software Developer for Carnegie Mellon's Augmented Perception Lab\n",
                     "Duration: August 2024 - Present\n",
                     "Description: \n",
                     "Tags: \n",
                     "Link to Devlog\n\n\n",

                     "APEX\n",
                     "Role: Full Stack Developer for Johns Hopkins Applied Physics Laboratory\n",
                     "Duration: May 2024 - August 2024\n",
                     "Description: Implemented network heavy features for a real-time collaborative application. Features necesitated\n",
                     "             querying a remote SQL database through a RESTful API, Handling real-time file uploading/downloading,\n",
                     "             enabling seamless concurrent interaction with uploaded media, designing application workflows to \n",
                     "             guarantee accessibility and ease of use, and querying language models to execute user voice commands.\n",
                     "Tags: Distributed System, Network Programming, Application Development, Language Models\n\n\n",

                     "Media Pipe to Mesh Hand Tracking System\n",
                     "Role: Software Developer for Carnegie Mellon's Augmented Perception Lab\n",
                     "Duration: August 2023 - December 2023\n",
                     "Description: Developed a pipeline bridging Google’s Media Pipe Hand Tracking and the Unity virtual environment.\n",
                     "             The pipeline takes in a live camera feed or prerecorded video and tracks the movements and gestures \n",
                     "             of a designated pair of hands hands present in the input, creating a seamless mapping to a pair of \n",
                     "             hand meshes within Unity.",
                     "Tags: Unity, Media-Pipe, Model Kinematics, Python, Socket.io\n\n\n",

                     "Exploring the Limits of AR Body Ownership through Acupuncture Simulation\n",
                     "Role: Software Developer under Carnegie Mellon's Augmented Perception Lab\n",
                     "Duration: May 2023 - August 2023\n",
                     "Description: Created an augmented reality acupuncture simulation for the Oculus Quest Pro by leveraging Meta’s \n", 
                     "             Oculus VR Integration for Unity. Collaborating University of Pittsburgh’s medical department in \n",
                     "             planning a medical study exploring whether AR acupuncture can be used as a placebo in acupuncture \n",
                     "             treatments.",
                     "Tags: Unity, Oculus Integration Toolkit, Body Ownership, Augmented Reality \n",
                     "Link To Video\n\n\n",

                     "ICOE-System\n",
                     "Role: Hobbyist Developer for personal project\n",
                     "Duration: January 2022 - May 2022\n",
                     "Description: Designed a framework consisting of ~21 Unity components and backend classes that implement a \n", 
                     "             dynamic behavior tree generated using genetic algorithms. The framework allows game developers to .\n",
                     "             create in-game entities whose physical appearances and behaviors evolve based on interactions with\n",
                     "             other entities as well as their environment.\n",
                     "Tags: Unity, Behavior Trees, Genetic Algorithms, Developer Tool\n",
                     "Link To Video\n\n\n"];
    projects_breaks = [
                       [[0,""],[projects_txts[0].length,"hardgold"]],
                       [[0,""],[5,"softgreen"],[projects_txts[1].length,"softgreenP"]],
                       [[0,""],[9,"dirtyblue"], [23, "dirtyblueP"],[projects_txts[2].length,"softred"]],
                       [[0,""],[projects_txts[3].length,"softgold"]],
                       [[0,""],[4,"softcyan"],[projects_txts[4].length,"softcyanP"]],
                       [[0,""],[-projects_txts[5].length,"pureblueU"]],
                       [[0,""],[projects_txts[6].length,"hardgold"]],
                       [[0,""],[5,"softgreen"],[projects_txts[7].length,"softgreenP"]],
                       [[0,""],[9,"dirtyblue"], [projects_txts[8].length,"dirtyblueP"]],
                       [[0,""],[12,"softgold"], [projects_txts[9].length,"softgoldP"]],
                       [[0,""],[projects_txts[10].length,"softgoldP"]],
                       [[0,""],[projects_txts[11].length,"softgoldP"]],
                       [[0,""],[projects_txts[12].length,"softgoldP"]],
                       [[0,""],[4,"softcyan"],[projects_txts[13].length,"softcyanP"]],
                       [[0,""],[projects_txts[14].length,"hardgold"]],
                       [[0,""],[5,"softgreen"],[projects_txts[15].length,"softgreenP"]],
                       [[0,""],[9,"dirtyblue"], [projects_txts[16].length,"dirtyblueP"]],
                       [[0,""],[12,"softgold"],[projects_txts[17].length,"softgoldP"]],
                       [[0,""],[projects_txts[18].length,"softgoldP"]],
                       [[0,""],[12,"softgreen"],[projects_txts[19].length,"softgoldP"]],
                       [[0,""],[projects_txts[20].length,"softgoldP"]],
                       [[0,""],[4,"softcyan"],[projects_txts[21].length,"softcyanP"]],
                       [[0,""],[projects_txts[22].length,"hardgold"]],
                       [[0,""],[5,"softgreen"], [projects_txts[23].length,"softgreenP"]],
                       [[0,""],[9,"dirtyblue"], [projects_txts[24].length, "dirtyblueP"]],
                       [[0,""],[12,"softgold"],[projects_txts[25].length,"softgoldP"]],
                       [[0,""],[projects_txts[26].length,"softgoldP"]],
                       [[0,""],[projects_txts[27].length,"softgoldP"]],
                       [[0,""],[projects_txts[28].length,"softgoldP"]],
                       [[0,""],[4,"softcyan"],[projects_txts[29].length,"softcyanP"]],
                       [[0,""],[-projects_txts[30].length,"pureblueU","https://www.youtube.com/watch?v=l7kz3PUt-Pw"]],
                       [[0,""],[projects_txts[31].length,"hardgold"]],
                       [[0,""],[5,"softgreen"],[projects_txts[32].length,"softgreenP"]],
                       [[0,""],[9,"dirtyblue"], [projects_txts[33].length,"dirtyblueP"]],
                       [[0,""],[12,"softgold"],[projects_txts[34].length,"softgoldP"]],
                       [[0,""],[projects_txts[35].length,"softgoldP"]],
                       [[0,""],[projects_txts[36].length,"softgoldP"]],
                       [[0,""],[projects_txts[37].length,"softgoldP"]],
                       [[0,""],[4,"softcyan"],[projects_txts[38].length,"softcyanP"]],
                       [[0,""],[-projects_txts[39].length,"pureblueU","https://www.youtube.com/watch?v=wIiD3CDTCD0"]]
                      ];


    lav_txt = "APL @ CMU (Augmented Perception Lab)\n"+
                      "Position: Full Time Researcher (\'23-\'Current)\n\n"+
                      "ECHO @ SAS(Educating Children of Hispanic Origin)\n"+
                      "Position: Vice President (\'19-\'20), President (\'20,\'22)\n\n"+
                      "Computer Science Honor Society @ SAS\n"+
                      "Position: Co-President (\'21-\'22)\n\n" + 
                      "Computer Science Tutoring\n" + 
                      "Position: Head Tutor (\'21-\'22)\n\n";

    lav_breaks=[[0,""],
                [36,"hardgold"],
                [46,"pureblueP"],
                [82,"pureblue"],
                [133,"hardgold"],
                [143,"pureblueP"],
                [191,"pureblue"],
                [228,"hardgold"],
                [238,"pureblueP"],
                [260,"pureblue"],
                [287,"hardgold"],
                [297,"pureblueP"],
                [lav_txt.length,"pureblue"]];

    /*

    about_txt = "Hello! My name is Henrique F. Lee, welcome to my website! I am currently a freshman in Carnegie Mellon’s School of Computer Science. My\n"+ 
                 "family is originally from Brazil and Colombia, but I grew up in the United States and Singapore.\n\n"+

                 "I started coding around 10 years ago, as I aspired to become a game developer when I grew up. Since then, my passion for both game\n"+ 
                 "development and computer science as a whole has only grown!\n\n"+

                 "On this website, you will find a bit more about my accomplishments and intellectual curiosities. If you have any enquiries or questions,\n"+ 
                 "feel free to email me at henriqueflee816@gmail.com.\n\n";

    about_breaks = [[0,""],
                    [87,"softgoldP"],
                    [-131,"pureblueU","https://www.cs.cmu.edu/"],
                    [297,"softgoldP"],
                    [311,"softgreen"],
                    [360,"softgoldP"],
                    [376,"softgreen"],
                    [381,"softgoldP"],
                    [397,"softgreen"],
                    [588,"softgoldP"],
                    [about_txt.length-3,"pureblue"],
                    [about_txt.length,"softgoldP"]];

    */



    about_txts = ["Hello! My name is Henrique F. Lee, welcome to my website! I am currently a sophomore in Carnegie Mellon’s School of Computer Science.\n",
                  "as a Computer Science Major with concentrations in Computer Systems and Computer Graphics. My family is originally from Brazil and\n",
                  "Colombia, but I grew up in Singapore.\n\n",
                
                  "I started coding around 11 years ago in hopes of creating video games when I grew up, and I am glad to say my passion for both\n",
                  "computer science and game development have only grown since then! Beyond the classroom I have done countless independent projects\n",
                  "exploring different areas of computer science including Machine Learning, App and Web Development, Render Pipelines, Simulation \n",
                  "Theory, and Procedural Generation.\n\n",

                  "At CMU, I have had honor of becoming a full time researcher in the Augmented Perception Lab, where I work alongside faculty, graduate\n",
                  "students, and fellow undergraduates to push the boundaries of Virtual, Augmented, and Mixed reality.\n\n",
                  
                  "On this website, you will find a bit more about my accomplishments and intellectual curiosities. If you have any enquiries or\n",
                  "questions, feel free to email me at henriqueflee816@gmail.com.\n\n"]


    about_breaks = [[[0,""],[88,"softgoldP"],[-132,"pureblueU","https://www.cs.cmu.edu/"],[about_txts[0].length,"softgoldP"]],
                    [[0,""],[5,"softgoldP"],[89,"softgreen"],[about_txts[1].length,"softgoldP"]],
                    [[0,""],[about_txts[2].length,"softgoldP"]],
                    [[0,""],[about_txts[3].length,"softgoldP"]],
                    [[0,""],[about_txts[4].length,"softgoldP"]],
                    [[0,""],[55,"softgoldP"],[72,"softgreen"],[73,"softgoldP"],[97,"softgreen"],[98,"softgoldP"],[115,"softgreen"],[116,"softgoldP"],[about_txts[5].length,"softgreen"]],
                    [[0,""],[6,"softgreen"],[12,"softgoldP"],[33,"softgreen"],[about_txts[6].length,"softgoldP"]],
                    [[0,""],[67,"softgoldP"],[-91,"pureblueU","https://augmented-perception.org/index"],[about_txts[7].length,"softgoldP"]],
                    [[0,""],[about_txts[8].length,"softgoldP"]],
                    [[0,""],[about_txts[9].length,"softgoldP"]],
                    [[0,""],[36,"softgoldP"],[-61,"pureblueU","mailto:mail@henriqueflee816@gmail.com"],[about_txts[10].length,"softgoldP"]],
                   ];

    return_txt = "If you wish to display all commands, type help and press enter.\n\n";


}

function clearChildren(elem,step){

    if(elem.childNodes.length > 0){
        let fc =  elem.firstChild;
       fc.remove();
       clearChildren(elem,step);
    }
    return elem.childNodes.length > 0 ? false:true;

}


function resetTerminal(){

    let pr = new Promise((resolve,reject)=>{
    
        let cc = clearChildren(terminalOutput,40);

        if(cc){
            resolve(cc);
        }
        else{
            reject(cc);
        }

    })

    pr.then((res)=>{


        showIntro();
        

    }).catch((res)=>{
        
        console.log("Caught result: "+ res);

    });

} 


function showBanner(){

    commandLine.readOnly = true;

    appendToTerminalOutput_Lines(terminalOutput,banner_txts,banner_breaks,1,commandLine);
    

}

function showHelp(){
    commandLine.readOnly = true;

    //appendToTerminalOutput_Typed(terminalOutput,help_txt,help_breaks,1,commandLine);
    appendToTerminalOutput_Lines(terminalOutput,help_txts,help_breaks,1,commandLine);

}

function showIntro(){

    commandLine.readOnly = true;
    appendToTerminalOutput_Lines(terminalOutput,intro_txts,intro_breaks,1,commandLine);

}

function showSkills(){

    commandLine.readOnly = true;
    appendToTerminalOutput_Lines(terminalOutput,skills_txts,skills_breaks,1,commandLine);
    //appendToTerminalOutput_Typed(terminalOutput,skills_txt,skills_breaks,1,commandLine);

}


function showEducation(helped){

    commandLine.readOnly = true;

    if(helped){
        appendToTerminalOutput_Typed(terminalOutput,education_txt + return_txt,
            education_breaks.concat([[education_txt.length + 42,"softgoldP"],
                                 [education_txt.length + 46,"softpurple"],
                                 [education_txt.length + 57,"softgoldP"],
                                 [education_txt.length + return_txt.length-3,"pureblue"],
                                 [education_txt.length + return_txt.length,"softgoldP"]]),
            1,commandLine);

    }
    else{
        appendToTerminalOutput_Typed(terminalOutput,education_txt,education_breaks,1,commandLine);
    }

}

function showMedia(helped){

    commandLine.readOnly = true;
    if(helped){
        appendToTerminalOutput_Typed(terminalOutput,media_txt + return_txt,
            media_breaks.concat([[media_txt.length + 42,"softgoldP"],
                                 [media_txt.length + 46,"softpurple"],
                                 [media_txt.length + 57,"softgoldP"],
                                 [media_txt.length + return_txt.length-3,"pureblue"],
                                 [media_txt.length + return_txt.length,"softgoldP"]]),
            1,commandLine);
    }
    else{
        appendToTerminalOutput_Typed(terminalOutput,media_txt,media_breaks,1,commandLine);
    }

}

function showProjects(){

    commandLine.readOnly = true;
    appendToTerminalOutput_Lines(terminalOutput,projects_txts,projects_breaks,1,commandLine);

}

function showAbout(helped){

    commandLine.readOnly = true;

    appendToTerminalOutput_Lines(terminalOutput,about_txts,about_breaks,1,commandLine);
   

}

function showLav(helped){

    commandLine.readOnly = true;

    if(helped){

        appendToTerminalOutput_Typed(terminalOutput,lav_txt + return_txt,
            lav_breaks.concat([[lav_txt.length + 42,"softgoldP"],
                                 [lav_txt.length + 46,"softpurple"],
                                 [lav_txt.length + 57,"softgoldP"],
                                 [lav_txt.length + return_txt.length-3,"pureblue"],
                                 [lav_txt.length + return_txt.length,"softgoldP"]]),
            1,commandLine);

    }
    else{
        appendToTerminalOutput_Typed(terminalOutput,lav_txt,lav_breaks,1,commandLine);
    }

}

function showResume(){
    window.open("files/Resume.pdf");
    window.scrollTo(0, document.body.scrollHeight);
}

function showAll(){

    commandLine.readOnly = true;

    appendToTerminalOutput_Typed(terminalOutput,
        "Media\n\n", [[0,""],[7,"softredH"]],
        1,null);
    showMedia();


    appendToTerminalOutput_Typed(terminalOutput,
        "Leadership and Volunteerism\n\n", [[0,""],[29,"softredH"]],
        1,null);
    showLav();

    appendToTerminalOutput_Typed(terminalOutput,
        "Skills\n\n", [[0,""],[8,"softredH"]],
        1,null);
    showSkills();

    appendToTerminalOutput_Typed(terminalOutput,
        "Projects\n\n", [[0,""],[10,"softredH"]],
        1,null);
    showProjects();

    appendToTerminalOutput_Typed(terminalOutput,
        "Education\n\n", [[0,""],[11,"softredH"]],
        1,null);
    showEducation();

    appendToTerminalOutput_Typed(terminalOutput,
        "About\n\n", [[0,""],[7,"softredH"]],
        1,null);
    showAbout();

}


function showUnknown(s){

    let out_s = "The command \'" + s + "\' is unknown, please type or click help and press enter for a list of available commands.\n\n";
    
    //commandLine.readOnly = true;

    appendToTerminalOutput_Typed(terminalOutput,out_s,
                                 [[0,""],[13,"softgoldP"],[13+s.length,"dirtyblueP"],[48+s.length,"softgoldP"],[52+s.length,"softpurple"],[63+s.length,"softgoldP"],[69+s.length,"pureblue"],[out_s.length,"softgoldP"]],
                                 1,commandLine);

}

function terminalOnClick(e){

    if(e.target.classList[0] == "softpurple" && commandLine.readOnly == false){
        commandLine.value = e.target.textContent.toLowerCase();
        processInput(commandLine,terminalOutput);

        
    }



}

function main(){
    
    
    
    initializeFields();

    document.addEventListener("keyup", function(event) {

        if (event.key === "Enter") {
            processInput(commandLine,terminalOutput);
        }
    });

    document.addEventListener("click",terminalOnClick);



    showIntro();
      
    
}

main();


