const memberstack = window.$memberstackDom;

var loadingClass = 'loading';
var lessonsID = 'lessons';
var completedClass = 'completed';
var notCompletedClass = 'notcompleted';
var lessonItemClass = '.lessonitem';
var completedState = notCompletedClass;
var courseItemClassCompleted = 'lesson_completed';
let memberID;

function isEmptyObject(obj) {
  return Object.keys(obj).length === 0;
}

memberstack.getCurrentMember().then(({ data: member }) => {
    if (member) {
        checkIsJSONExist(member.id);
	    checkOnBoardingForm(member);
    } 
})

async function checkIsJSONExist(memberID) {
    const memberData = await memberstack.getMemberJSON(memberID);    

    if (!memberData.data) {
        memberstack.updateMemberJSON({ 
            json: {
                "completed": [],
            }
        });
    } 
    displayAllCompletedLessons(memberID);
}

async function checkOnBoardingForm(member) {
	if(!member.customFields['other-diagnosis']) {
	    if(!member.customFields['diagnosis'] || !member.customFields['symptoms']) { 
            	var getRecommendOnBoarding = document.getElementById('recommend-onboarding');
		getRecommendOnBoarding.style.display = 'block'
	    } else {
            	var getRecommendBlogs = document.getElementById('recommend-blogs');
		getRecommendBlogs.style.display = 'block'
            
            if (member.customFields['diagnosis']) {
                var getConditionSection = document.getElementById('conditions-section');
                getConditionSection.style.display = 'block';
                var getConditions = member.customFields['diagnosis'];
                var getConditionsLast = getConditions.split(',')[0];
                var getConditionsFormatted = getConditionsLast.replace(/\s+/g, '-').toLowerCase();
                var conditionsList = document.querySelectorAll('#conditions-list [conditions="'+ getConditionsLast +'"]');
                var conditionsLastThreeItems = Array.from(conditionsList).slice(0, 3);
                conditionsLastThreeItems.forEach((item) => {
                    item.style.display = 'block';
                });
                var getLearnMore = document.getElementById('conditions-learn-more');
                getLearnMore.href = 'https://www.welltheory.com/subcategory/' + getConditionsFormatted;
                var getConditionSpan = document.getElementById('conditions-name');
                getConditionSpan.innerText = getConditionsLast;      

                var getAllConditions = getConditions.split(",");
                if (getAllConditions.length > 1) {
                    var oldID = getConditionSection.id;
                    getAllConditions.forEach(function(item, index) {
                        getConditionSection.setAttribute('id', 'conditions-section-' + index);
                        if (index !== 0) {    
                            var getParentWrapper = document.getElementById('diagnosis-wrapper');
                            getParentWrapper.innerHTML += getConditionSection.outerHTML;
                            
                            if (index == 1) {
                                var getFirstCondition = document.getElementById('conditions-section-' + index);
                                getFirstCondition.setAttribute('id', oldID);
                            }

                            var currentConditionsListReset = document.querySelectorAll('#conditions-section-' + index + ' #conditions-list .w-dyn-item');
                            currentConditionsListReset.forEach((i) => {
                                i.style.display = 'none';
                            });
                            
                            var getCurrentConditions = document.getElementById('conditions-section-' + index);
                            var getCurrentConditionFormatted = item.replace(/\s+/g, '-').toLowerCase();
                            var currentConditionsList = document.querySelectorAll('#conditions-section-' + index + ' #conditions-list [conditions="'+ item +'"]');
                            var currentConditionsLastThreeItems = Array.from(currentConditionsList).slice(0, 3);
                            currentConditionsLastThreeItems.forEach((i) => {
                                i.style.display = 'block';
                            });
                            var getCurrentLearnMore = document.querySelector('#conditions-section-' + index +' #conditions-learn-more');
                            getCurrentLearnMore.href = 'https://www.welltheory.com/subcategory/' + getCurrentConditionFormatted;
                            var getCurrentConditionSpan = document.querySelector('#conditions-section-' + index + ' #conditions-name');
                            getCurrentConditionSpan.innerText = item;      
                        }
                    });
                }
            }

            if (member.customFields['symptoms']) {
                var getSymptomsSection = document.getElementById('symptoms-section');
                getSymptomsSection.style.display = 'block';
                var getSymptoms = member.customFields['symptoms']; 
                var getSymptomsLast = getSymptoms.split(',')[0];
                var getSymptomsLastFormatted = getSymptomsLast.replace(/\s+/g, '-').toLowerCase();
                var symptomsList = document.querySelectorAll('#symptoms-list [conditions="'+ getSymptomsLast +'"]');
                var symptomsLastThreeItems = Array.from(symptomsList).slice(0, 3);
                symptomsLastThreeItems.forEach((item) => {
                    item.style.display = 'block';
                });
                var getLearnMoreSymptoms = document.getElementById('symptoms-learn-more');
                getLearnMoreSymptoms.href = 'https://www.welltheory.com/subcategory/' + getSymptomsLastFormatted;
                var getSymptomsSpan = document.getElementById('symptoms-name');
                getSymptomsSpan.innerText = getSymptomsLast;   
                
                var getAllSymptoms = getSymptoms.split(",");
                if (getAllSymptoms.length > 1) {
                    var oldID = getSymptomsSection.id;
                    getAllSymptoms.forEach(function(item, index) {
                        getSymptomsSection.setAttribute('id', 'symptoms-section-' + index);
                        if (index !== 0) {    
                            var getParentWrapper = document.getElementById('symptoms-wrapper');
                            getParentWrapper.innerHTML += getSymptomsSection.outerHTML;
                            
                            if (index == 1) {
                                var getFirstSymptoms = document.getElementById('symptoms-section-' + index);
                                getFirstSymptoms.setAttribute('id', oldID);
                            }

                            var currentSymptomsListReset = document.querySelectorAll('#symptoms-section-' + index + ' #symptoms-list .w-dyn-item');
                            currentSymptomsListReset.forEach((i) => {
                                i.style.display = 'none';
                            });
                            
                            var getCurrentSymptoms = document.getElementById('symptoms-section-' + index);
                            var getCurrentSymptomFormatted = item.replace(/\s+/g, '-').toLowerCase();
                            var currentSymptomsList = document.querySelectorAll('#symptoms-section-' + index + ' #symptoms-list [conditions="'+ item +'"]');
                            var currentSymptomsLastThreeItems = Array.from(currentSymptomsList).slice(0, 3);
                            currentSymptomsLastThreeItems.forEach((i) => {
                                i.style.display = 'block';
                            });
                            var getCurrentLearnMore = document.querySelector('#symptoms-section-' + index +' #symptoms-learn-more');
                            getCurrentLearnMore.href = 'https://www.welltheory.com/subcategory/' + getCurrentSymptomFormatted;
                            var getCurrentSymptomSpan = document.querySelector('#symptoms-section-' + index + ' #symptoms-name');
                            getCurrentSymptomSpan.innerText = item;      
                        }
                    });
                }
            }
		}
	}
}
        
async function displayAllCompletedLessons(memberID) {
    const memberData = await memberstack.getMemberJSON(memberID);    

    var completedLessons = memberData.data.completed ? memberData.data.completed : [];

    //var links = document.getElementById(lessonsID).getElementsByTagName('a');
	var categories = document.querySelectorAll("[course=lessons]");

    categories.forEach((item) => {
    	var links = item.getElementsByTagName('a');
    
    
    for (let i = 0; i < links.length; i++) {
        var link = links[i];
        var linkUrl = link.href;
        for (let l = 0; l < completedLessons.length; l++) {
            var completedUrl = completedLessons[l];
            if (linkUrl === completedUrl) {
                completedState = completedClass;
                l = completedLessons.length;
            } else {
                completedState = notCompletedClass;
            }
        }

        let lessonItem = link.closest(lessonItemClass);
        (completedState === completedClass) ? displayCompleted(lessonItem): displayNotCompleted(lessonItem);
    }
		});

    function displayCompleted(lessonItem) {
        lessonItem.getElementsByClassName(loadingClass)[0].style.display = 'none';
        lessonItem.getElementsByClassName(completedClass)[0].style.display = 'block';
        lessonItem.getElementsByClassName(notCompletedClass)[0].style.display = 'none';
        lessonItem.getElementsByTagName('a')[0].classList.add(courseItemClassCompleted);
    }

    function displayNotCompleted(lessonItem) {
        lessonItem.getElementsByClassName(loadingClass)[0].style.display = 'none';
        lessonItem.getElementsByClassName(notCompletedClass)[0].style.display = 'block';
        lessonItem.getElementsByClassName(completedClass)[0].style.display = 'none';
    }
}
