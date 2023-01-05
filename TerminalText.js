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

    let outputText = inputField.value.toLowerCase();
    
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
                   [45,"softgold"],
                   [52,"softpurple"],
                   [93,"softgold"],
                   [108,"softpurple"],
                   [157,"softgold"],
                   [170,"softpurple"],
                   [208,"softgold"],
                   [217,"softpurple"],
                   [231,"softgold"],
                   [236,"softpurple"],
                   [271,"softgold"],
                   [276,"softpurple"],
                   [301,"softgold"],
                   [310,"softpurple"],
                   [335,"softgold"],
                   [340,"softpurple"],
                   [371,"softgold"],
                   [381,"softpurple"],
                   [390,"softgold"],
                   [396,"pureblue"],
                   [help_txt.length,"softgold"]];

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
                 "Type a command and press enter to explore!\n\n"];

    help_breaks = [[[0,""],[help_txts[0].length,"softpurple"]],
                   [[0,""],[help_txts[1].length,"softgold"]],
                   [[0,""],[help_txts[2].length,"softpurple"]],
                   [[0,""],[help_txts[3].length,"softgold"]],
                   [[0,""],[help_txts[4].length,"softpurple"]],
                   [[0,""],[help_txts[5].length,"softgold"]],
                   [[0,""],[help_txts[6].length,"softpurple"]],

                   [[0,""],
                    [52,"softgold"],
                    [62,"softpurple"],
                    [102,"softgold"],
                    [110,"softpurple"],
                    [126,"softgold"],
                    [131,"softpurple"],
                    [164,"softgold"],
                    [171,"softpurple"],
                    [194,"softgold"],
                    [203,"softpurple"],
                    [228,"softgold"],
                    [235,"softpurple"],
                    [265,"softgold"],
                    [275,"softpurple"],
                    [285,"softgold"],
                    [291,"pureblue"],
                    [help_txts[5].length,"softgold"]]];


            

    intro_txts = [" __    __   _______ .__   __. .______    __    ______     __    __   _______     _______       __       _______  _______ \n",
                  "|  |  |  | |   ____||  \\ |  | |   _  \\  |  |  /  __  \\   |  |  |  | |   ____|   |   ____|     |  |     |   ____||   ____|\n",
                  "|  |__|  | |  |__   |   \\|  | |  |_)  | |  | |  |  |  |  |  |  |  | |  |__      |  |__        |  |     |  |__   |  |__   \n",
                  "|   __   | |   __|  |  . `  | |      /  |  | |  |  |  |  |  |  |  | |   __|     |   __|       |  |     |   __|  |   __|  \n",
                  "|  |  |  | |  |____ |  |\\   | |  |\\  \\  |  | |  '--'  |  |  '--'  | |  |____    |  |    __    |  `----.|  |____ |  |____ \n",
                  "|__|  |__| |_______||__| \\__| | _| \\._\\ |__|  \\_____\\__\\  \\______/  |_______|   |__|   (__)   |_______||_______||_______|\n\n"+
                  "Welcome, here are a list of available commands, type a command and press enter to begin exploring:\n\n" + 
                  "help\n" + 
                  "   - Lists detailed view of each command\n\n"+
                  "about\n"+
                  "   - Information regarding my background\n\n"+
                  "resume\n"+
                  "   -  View my resume in a new tab\n\n"+
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
                  "   - Reset the terminal\n\n"];

    intro_breaks = [[[0,""],[intro_txts[0].length,"pureblue"]],
                   [[0,""],[intro_txts[1].length,"pureblue"]],
                   [[0,""],[intro_txts[2].length,"pureblue"]],
                   [[0,""],[intro_txts[3].length,"pureblue"]],
                   [[0,""],[intro_txts[4].length,"pureblue"]],

                   [[0,""],[121,"pureblue"],
                    [175,"softgold"],[185,"softpurple"],[195,"softgold"],[201,"pureblue"],
                    [221,"softgold"],
                    [228,"softpurple"],
                    [269,"softgold"],
                    [276,"softpurple"],
                    [317,"softgold"],
                    [324,"softpurple"],
                    [360,"softgold"],
                    [373,"softpurple"],
                    [424,"softgold"],
                    [436,"softpurple"],
                    [472,"softgold"],
                    [480,"softpurple"],
                    [496,"softgold"],
                    [503,"softpurple"],
                    [534,"softgold"],
                    [541,"softpurple"],
                    [564,"softgold"],
                    [573,"softpurple"],
                    [598,"softgold"],
                    [605,"softpurple"],
                    [intro_txts[5].length,"softgold"]]];
    


    media_txt = "Email          henriqueflee816@gmail.com\n\n"+
                "GitHub         HFL816\n\n"+
                "LinkedIn       Henrique F. Lee\n\n"+
                "Instagram      hfl_16\n\n";

    media_breaks = [[0,""],
                    [15,"softgold"],
                    [40,"pureblue"],
                    [57,"softgold"],
                    [-63,"pureblueU","https://github.com/HFL816"],
                    [80,"softgold"],
                    [-95,"pureblueU","https://www.linkedin.com/in/henrique-f-lee-666475256"],
                    [112,"softgold"],
                    [-media_txt.length,"pureblueU","https://www.instagram.com/hfl_16/"]]; //TODO: INSERT LINKS

    skills_txts = ["Programming Languages:                              Game Engines:                              Data Analysis:\n\n",
                   "           C#: ■ ■ ■ ■ □                               Unity: ■ ■ ■ ■ □                           Julia: ■ ■ ■ ■ □\n\n",
                   "   Javascript: ■ ■ ■ ■ □                          Game Maker: ■ ■ ■ □ □                           Excel: ■ ■ ■ □ □\n\n",
                   "         Java: ■ ■ ■ ■ □\n\n",
                   "       Python: ■ ■ ■ ■ □                                                                           Languages:\n\n",
                   "            C: ■ ■ ■ □ □                             Digital Art:                               English: Native\n\n",
                   "     HTML/CSS: ■ ■ ■ □ □                           Photoshop: ■ ■ ■ ■ □                         Spanish: Native\n\n",
                   "        Swift: ■ ■ □ □ □                             Blender: ■ ■ ■ ■ □                      Portuguese: Native\n\n",
                   "         HLSL: ■ ■ □ □ □                            Aseprite: ■ ■ ■ □ □                        Mandarin: 7+ years\n\n"];

    skills_breaks = [[[0,""],[skills_txts[0].length,"hardgold"]],
                     [[0,""],[15,"softgold"],[25,"pureblue"],[61,"softgold"],[73,"pureblue"],[104,"softgold"],[skills_txts[1].length,"pureblue"]],
                     [[0,""],[15,"softgold"],[25,"pureblue"],[61,"softgold"],[73,"pureblue"],[104,"softgold"],[skills_txts[2].length,"pureblue"]],
                     [[0,""],[15,"softgold"],[skills_txts[3].length,"pureblue"]],
                     [[0,""],[15,"softgold"],[73,"pureblue"],[109,"hardgold"],[skills_txts[4].length,"pureblue"]],
                     [[0,""],[15,"softgold"],[25,"pureblue"],[65,"hardgold"],[73,"pureblue"],[104,"softgold"],[skills_txts[5].length,"pureblue"]],
                     [[0,""],[15,"softgold"],[25,"pureblue"],[61,"softgold"],[73,"pureblue"],[104,"softgold"],[skills_txts[6].length,"pureblue"]],
                     [[0,""],[15,"softgold"],[25,"pureblue"],[61,"softgold"],[73,"pureblue"],[104,"softgold"],[skills_txts[7].length,"pureblue"]],
                     [[0,""],[15,"softgold"],[25,"pureblue"],[61,"softgold"],[73,"pureblue"],[104,"softgold"],[skills_txts[8].length,"pureblue"]]];

    education_txt = "Carnegie Mellon University, School of Computer Science\n\n"+
                    "Bachelor of Science in Computer Science (current)\n\n"+
                    "GPA: 3.73/4.0 \n\n"+
                    "Selected Coursework:\n"+
                    "   -Matrices and Linear Transformations (21-241)\n"+
                    "   -Mathematical Foundations for Computer Science (15-151)\n"+
                    "   -Principles of Imperative Computation (15-122)\n\n\n"+
                    "Singapore American School\n\n"+
                    "High School Diploma\n\n"+
                    "GPA: 4.3\n\n"+
                    "Selected Coursework:\n"+
                    "   -Advanced Data Structures\n"+
                    "   -Advanced Topic: Linear Algebra\n"+
                    "   -Advanced Topic: Multivariable Calculus\n"+
                    "   -Advanced Placement: Computer Science\n\n";

    education_breaks = [[0,""],
                        [54,"hardgold"],
                        [105,"pureblueP"],
                        [111,"softgreenP"],
                        [120,"softgold"],
                        [143,"dirtyblueP"],
                        [185,"softgold"],
                        [-191,"pureblueU","https://www.math.cmu.edu/~ldietric/21-241/syllabus.pdf"], //TODO: Check copyrights
                        [244,"softgold"],
                        [-250,"pureblueU","https://www.math.cmu.edu/~jmackey/151_128/syll.html"],
                        [294,"softgold"],
                        [-300,"pureblueU","https://www.cs.cmu.edu/~15122/"],
                        [304,"softgold"],
                        [329,"hardgold"],
                        [350,"pureblueP"],
                        [356,"softgreenP"],
                        [360,"softgold"],
                        [385,"dirtyblueP"],
                        [education_txt.length,"softgold"]];

    projects_txts = ["ICOE\n",
                    "Languages: C#\n",
                    "Description: Architected and developed a framework that allows game developers to create in-game entities  \n", 
                    "             that evolve based on interactions with other entities as well as their environment.\n",
                    "Tags: Unity, Behavior Trees, Genetic Algorithms\n\n",

                    "Level Surface Procedural Generation\n",
                    "Languages: Python, C#\n",
                    "Description: Leveraged mathematical level sets to design a series of algorithms that provide a\n",
                    "             unique approach to procedurally generated terrain in two and three dimensions.\n",
                    "Tags: Multivariable Calculus, Unity, Procedural Generation\n\n",
                    
                    "Darwin's Game\n",
                    "Languages: Java, C#\n"+
                    "Description: Based on Conway\'s game of life, Darwin\'s game is a cellular automata simulation where different organisms\n"+ 
                    "             with unique characteristics compete for scarce resources to see which traits are more favorable under\n"+ 
                    "             different environmental conditions.\n"+
                    "Tags: Cellular Automata, Simulation, Evolution\n\n"+

                    "OOP Lecture Curriculum\n"+
                    "Languages: Java\n"+
                    "Description: Created a series of detailed video lectures and presentations teaching all of the fundamental\n"+ 
                    "             concepts behind Object Oriented Programming.\n"+ 
                    "Tags: OOP, Teaching\n\n"];


    //projects_breaks = [[0,""],[projects_txt.length,"softgold"]];
    projects_breaks = [[[0,""],[projects_txts[0].length,"hardgold"]],
                       [[0,""],[10,"softgreenP"],[projects_txts[1].length,"softgreen"]],
                       [[0,""],[12,"dirtyblueP"],[projects_txts[2].length,"softgold"]],
                       [[0,""],[projects_txts[3].length,"softgold"]],
                       [[0,""],[5,"pureblueP"],[projects_txts[4].length,"pureblue"]],
                       [[0,""],[projects_txts[5].length,"hardgold"]],
                       [[0,""],[10,"softgreenP"],[projects_txts[6].length,"softgreen"]],
                       [[0,""],[12,"dirtyblueP"],[projects_txts[7].length,"softgold"]],
                       [[0,""],[projects_txts[8].length,"softgold"]],
                       [[0,""],[5,"pureblueP"],[projects_txts[9].length,"pureblue"]],
                       [[0,""],[projects_txts[10].length,"hardgold"]],

                       [[0,""],
                        [10,"softgreenP"],
                        [19,"softgreen"],
                        [32,"dirtyblueP"],
                        [302,"softgold"],
                        [309,"pureblueP"],
                        [349,"pureblue"],
                        [373,"hardgold"],
                        [384,"softgreenP"],
                        [389,"softgreen"],
                        [402,"dirtyblueP"],
                        [554,"softgold"],
                        [560,"pureblueP"],
                        [projects_txts[11].length,"pureblue"]]];


    lav_txt = "SALSA @ CMU (Spanish and Latin Student Association)\n"+
                      "Position: Freshman Representative (\'22-\'23)\n\n"+
                      "ECHO @ SAS (Educating Children of Hispanic Origin)\n"+
                      "Position: Vice President (\'19-\'20), President (\'20,\'22)\n\n"+
                      "Computer Science Honor Society @ SAS\n"+
                      "Position: Co-President (\'21-\'22)\n\n";

    lav_breaks=[[0,""],
                [51,"hardgold"],
                [62,"pureblueP"],
                [96,"pureblue"],
                [147,"hardgold"],
                [157,"pureblueP"],
                [203,"pureblue"],
                [241,"hardgold"],
                [251,"pureblueP"],
                [lav_txt.length,"pureblue"]];

    /*

    about_txt = "Hello! My name is Henrique F. Lee, welcome to my website! I am currently a freshman in Carnegie Mellon’s School of Computer Science. My\n"+ 
                 "family is originally from Brazil and Colombia, but I grew up in the United States and Singapore.\n\n"+

                 "I started coding around 10 years ago, as I aspired to become a game developer when I grew up. Since then, my passion for both game\n"+ 
                 "development and computer science as a whole has only grown!\n\n"+

                 "On this website, you will find a bit more about my accomplishments and intellectual curiosities. If you have any enquiries or questions,\n"+ 
                 "feel free to email me at henriqueflee816@gmail.com.\n\n";

    about_breaks = [[0,""],
                    [87,"softgold"],
                    [-131,"pureblueU","https://www.cs.cmu.edu/"],
                    [297,"softgold"],
                    [311,"softgreen"],
                    [360,"softgold"],
                    [376,"softgreen"],
                    [381,"softgold"],
                    [397,"softgreen"],
                    [588,"softgold"],
                    [about_txt.length-3,"pureblue"],
                    [about_txt.length,"softgold"]];

    */



    about_txts = ["Hello! My name is Henrique F. Lee, welcome to my website! I am currently a freshman in Carnegie Mellon’s School of Computer Science.\n",
                  "My family is originally from Brazil and Colombia, but I grew up in the United States and Singapore.\n\n",
                
                  "I started coding around 10 years ago in Python, as I started using the language in summer courses and independent projects that\n",
                  "expanded my knowledge of the language and OOP as a whole. Once I reached high school, I began delving into different areas of\n",
                  "Computer Science whenever I had free time on my hands.\n\n",
                
                  "I spent summers learning about Data Structures, and Machine Learning at university programs hosted at Harvard, Brown, and\n"+
                  "UT Austin, and created my own projects exploring topics such as App and Web Development, Simulation Theory, Render Pipelines,\n"+
                  " and my personal favorite, Game Development.\n\n"+

                  "On this website, you will find a bit more about my accomplishments and intellectual curiosities. If you have any enquiries or questions,"+
                  " feel free to email me at henriqueflee816@gmail.com.\n\n"];

    about_breaks = [[[0,""],[87,"softgold"],[-(about_txts[0].length-2),"pureblueU","https://www.cs.cmu.edu/"],[about_txts[0].length,"softgold"]],

                    [[0,""],[about_txts[1].length,"softgold"]],
                    [[0,""],[40,"softgold"],[46,"softgreen"],[about_txts[2].length,"softgold"]],
                    [[0,""],[42,"softgold"],[46,"softgreen"],[about_txts[3].length,"softgold"]],
                    [[0,""],[about_txts[4].length,"softgold"]],

                    [[0,""],
                     [31,"softgold"],
                     [46,"softgreen"],
                     [52,"softgold"],
                     [68,"softgreen"],
                     [186,"softgold"],
                     [209,"softgreen"],
                     [211,"softgold"],
                     [228,"softgreen"],
                     [230,"softgold"],
                     [246,"softgreen"],
                     [275,"softgold"],
                     [291,"softgreen"],
                     [455,"softgold"],
                     [481,"pureblue"],
                     [about_txts[5].length,"softgold"]]];


    


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
            education_breaks.concat([[education_txt.length + 42,"softgold"],
                                 [education_txt.length + 46,"softpurple"],
                                 [education_txt.length + 57,"softgold"],
                                 [education_txt.length + return_txt.length-3,"pureblue"],
                                 [education_txt.length + return_txt.length,"softgold"]]),
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
            media_breaks.concat([[media_txt.length + 42,"softgold"],
                                 [media_txt.length + 46,"softpurple"],
                                 [media_txt.length + 57,"softgold"],
                                 [media_txt.length + return_txt.length-3,"pureblue"],
                                 [media_txt.length + return_txt.length,"softgold"]]),
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
            lav_breaks.concat([[lav_txt.length + 42,"softgold"],
                                 [lav_txt.length + 46,"softpurple"],
                                 [lav_txt.length + 57,"softgold"],
                                 [lav_txt.length + return_txt.length-3,"pureblue"],
                                 [lav_txt.length + return_txt.length,"softgold"]]),
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

    let out_s = "The command \'" + s + "\' is unknown, please type help and press enter for a list of available commands.\n\n";
    
    appendToTerminalOutput_Typed(terminalOutput,out_s,
                                 [[0,""],[13,"softgold"],[13+s.length,"dirtyblueP"],[39+s.length,"softgold"],[43+s.length,"softpurple"],[54+s.length,"softgold"],[59+s.length,"pureblue"],[out_s.length,"softgold"]],
                                 1,commandLine);

}

function main(){

    initializeFields();

    document.addEventListener("keyup", function(event) {

        if (event.key === "Enter") {
            processInput(commandLine,terminalOutput);
        }
    });

    showIntro();

}

main();
