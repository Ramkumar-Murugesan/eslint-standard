const initialState = {
};

export default function login(state = initialState, action) {
  switch (action.type) {
      case 'USER_LOGIN':
       return {
         ...state,
         userlogin:action,
       };

       case 'CREATE_STUDENT_SUCCESS':
       return {
         ...state,
         loginStudentResponse:action.createStudentRegistration.data,
       };

       case 'ALL_TRAINERS':
        return {
          ...state,
          allTrainers:action.data,
        };
        case 'TRAINER_LOGIN':
        return {
          ...state,
          userlogin:action,
        };
        case 'ADMIN_LOGIN':
        return {
          ...state,
          userlogin:action,
        };
        case 'BUSINESS_ADMIN_LOGIN':
        return {
          ...state,
          userlogin:action,
        };


    default:
      return state;
  }
  
}
