// /**
//  * Imort Validaton error type to annotate the return type of the custom validator function
//  */


// import { ValidationErrors,AbstractControl } from "@angular/forms";



// export class RegisterValidator {
    
//     /**
//      * Validators must return either a object containg error or null
//      * We should annotate the method for type saftey
//      */
//     /**
//      * The next step is to accept the form group at the top of the file.
//      * We will update the import statement to include the abstract control class.
//      * Inside the match methods arguments, we will add an argument called group annotated with the abstract
//      * control class.
//      */

//     static matchPassword(group:AbstractControl):ValidationErrors | null{

//         const password=group.get('password');
//         const confirmPassword=group.get('confirmPassword');

//         if(!password || !confirmPassword){
//             // Return Error
//             return { missingValue:true }
//         }

//         const error=password.value===confirmPassword.value ? null : { match:false }

//         return error;
//     }

// }


import { ValidationErrors,AbstractControl, ValidatorFn } from "@angular/forms";

export class RegisterValidator{

    static match(control:string,matchControl:string):ValidatorFn{
        return (group : AbstractControl) : ValidationErrors | null =>{
            const ctrl=group.get(control);
            const matchCtrl=group.get(matchControl);

            if(!ctrl || !matchCtrl){
                return {missingValue:true}
            }

            const error=ctrl.value===matchCtrl.value ? null : {noMatch:true};

            /**
             * Adding Error to control manually
             */

            matchCtrl.setErrors(error);

            return error;
        }
    }
}