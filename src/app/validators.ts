import { FormGroup, ValidatorFn, ValidationErrors, AbstractControl, Validators } from '@angular/forms';
import { isNull } from '@angular/compiler/src/output/output_ast';

export function ValidateRequiredType(type: string, fields: string[]): ValidatorFn {
    return (control: FormGroup): { [key: string]: boolean } | null => {
    if(control.get(type).value) {
        let itype = control.get(type).value;
        let thisEmpty = control.get(fields[itype]).value == ''; 
        if(control.get(fields[itype]).value == '') {
            return{ 'requiredType': true }
        } else {
            return null; 
        }
    } else {
        return null; 
    }
        
    };
}

export function ValidateAllOrNothing(fields: string[]): ValidatorFn {
    return (control: FormGroup): { [key: string]: boolean } | null => {
        let values = fields.map(x => control.get(x).value == '' || control.get(x).value == null); 
        if(values.every(x => x) || values.every(x => !x)) {
            return null; 
        } else {
            return { 'allOrNothing': true }; 
        }
    };
}

export function ValidatePassword(field1: string, field2: string): ValidatorFn {
    return (control: FormGroup): { [key: string]: boolean } | null => {
        let v1 = control.get(field1).value; 
        let v2 = control.get(field2).value; 
        if(v1 == v2) {
            return null; 
        } else {
            return { 'password': true }; 
        }
    };
}
