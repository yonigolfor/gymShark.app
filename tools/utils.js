
const Title = 'GolFit';

getMonth = () => {
    return numToMonth(new Date().getMonth() + 1);
}
getMonthHebrew = () => {
    let monthEnglish = numToMonth(new Date().getMonth() + 1);
    switch(monthEnglish){
        case 'January': 
            return 'ינואר'
        case 'February':
            return 'פברואר'
        case 'March': 
            return 'מרץ'
        case 'April':
            return 'אפריל'
        case 'May': 
            return 'מאי'
        case 'June':
            return 'יוני'
        case 'July': 
            return 'יולי'
        case 'August':
            return 'אוגוסט'
        case 'September': 
            return 'ספטמבר'
        case 'October':
            return 'אוקטובר' 
        case 'November': 
            return 'נובמבר'
        case 'December':
            return 'דצמבר'
    }
}

numToMonth = (num) => {
    switch(num){
        case 1: 
            return 'January'
        case 2:
            return 'February'
        case 3: 
            return 'March'
        case 4:
            return 'April'
        case 5: 
            return 'May'
        case 6:
            return 'June'
        case 7: 
            return 'July'
        case 8:
            return 'August'
        case 9: 
            return 'September'
        case 10:
            return 'October' 
        case 11: 
            return 'November'
        case 12:
            return 'December'
    }
}

  export const Utils = {
    getMonth: getMonth(),
    Title: Title,
    getMonthHebrew: getMonthHebrew(),

}

export const Language = {
    greetingHomePage: {
        en: 'Welcome',
        he: 'יום טוב',
        
    },
    enterResultsButton: {
        en: `Enter today's results`,
        he: 'הכנס תוצאות אימון'
    },
    trackerButton: {
        en: 'Tracker',
        he: 'ההתקדמות שלי'
    },
    resultsScreenTitle: {
        en: 'MY PLANS',
        he: 'האימונים שלי'
    },
    resultsAddPlan: {
        en: 'Add plan',
        he: 'צור אימון'
    },
    resultsHistoryBtn: {
        en: 'History',
        he: 'היסטוריית אימונים'
    },
    resultsDoneBtn: {
        en: 'Done',
        he: 'בוצע'
    },
    resultsModalText: {
        en: `Let's create your first plan`,
        he: 'כעת נכין את תכנית האימונים הראשונה שלך'
    },
    resultsModalBtn: {
        en: `Create!`,
        he: 'קדימה!'

    },
    resultsCreatePlan: {
        en: `Create plan`,
        he: 'צור אימון חדש'
    },
    newPlanFormTitle: {
        en: 'NEW PLAN',
        he: 'אימון חדש'
    },
    newPlanFormPlanName: {
        en: 'Enter plan name :',
        he: 'שם האימון :'
    },
    newPlanFormSets: {
        en: 'Enter general sets per exercise :',
        he: ': הכנס מספר סטים לתרגיל בדרך כלל'
    },
    newPlanFormReps: {
        en: 'Enter general reps per set :',
        he: ': הכנס מספר חזרות לסט בדרך כלל'
    },
    newPlanFormExNames: {
        en: 'Enter exercises names :',
        he: ': התרגילים שברצונך לבצע'
    },
    newPlanFormAddEx: {
        en: 'Add exercise',
        he: 'הוסף תרגיל'
    },
    newPlanFormSubmit: {
        en: 'Submit',
        he: 'סיימתי'
    },
    trackerModalText: {
        en: `Here you can track your progress by graphs and charts, but first enter results to your plans. `,
        he: 'כאן תנהלו מעקב אחר התהליך שלכם בעזרת ניתוח התוצאות האישיות שלכם. כעת עדיין לא הכנסתם נתונים.'
    },
    trackerModalBtn: {
        en:'Got it!',
        he:'הבנתי'
    },
    trackerTitle: {
        en:'Overall progress',
        he:'ההתקדמות שלי'
    },
    planDoneBtn: {
        en:'Done',
        he:'סיום'
    },
    historyTitle: {
        en:'My History',
        he:'היסטוריית אימונים'
    },
    // newPlanFormErrSets: {
    //     en: 'Sets must be between 1-10',
    //     he: 'סטים צריכים להיות בין 1 - 10'
    // },
    newPlanFormErrExNames: {
        en: 'Exercises list is empty!',
        he: 'רשימת התרגילים ריקה!'
    },
    newPlanFormErrDuplicateEx: {
        en: `Can't duplicate same exercise!`,
        he: 'אותו התרגיל רשום יותר מפעם אחת!'
    },
    planTickAllEx: {
        en: 'Check all exercises!',
        he: 'לא סימנת וי בכל התרגילים!'
    },
    exerciseFillAllReps: {
        en: 'Fill all reps or change number of sets.',
        he: 'מלא את כל החזרות או שנה את מספר הסטים'
    },
    exerciseRepsRange: {
        en: 'Reps must be 1-25',
        he: 'חזרות בטווח 1-25'
    },
    exerciseSetsRange: {
        en: 'Sets must be 1-10',
        he: 'סטים בטווח 1-10'
    },
    exerciseValidKg: {
        en: 'Enter valid kg',
        he: 'הכנס משקל'
    },


    

    

    





    


}
