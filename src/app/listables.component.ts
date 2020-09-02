import { Listable } from './model'; 
import { StoreService } from './store.service'; 
import { FormGroup, Validator, FormControl, Validators } from '@angular/forms';

export class ListablesComponent<T extends Listable> {

    objects = [{objects: [], editable: false, form: this.makeTypeForm()}] as {objects: T[], editable: boolean, form: FormGroup}[]; 
    edittedId: number;
    mode = 'none';
    c: new (object?: any) => T;

    constructor(
        public store: StoreService
    ) {}

    modeSelect(e: string) {
        if(this.mode == 'sort' && e == 'none') {
          this.store.updateListables(this.processObjects());
        }
        if(e == 'create-group') {
          this.objects.push({objects: [], editable: true, form: this.makeTypeForm('New group')});
        }
        this.mode = e;  
      }
    
      onEdit(e: number): void {
        if(this.mode == 'none') {
          this.mode = 'edit';
          this.edittedId = e; 
        } else {
          this.mode = 'none';
          this.edittedId = null; 
        }
      }
    
      onDelete(event: T): void {
        this.store.deleteListable(this.c, event); 
      }

      makeTypeForm(name?: string): FormGroup {
        return new FormGroup({
          name: new FormControl(name ? name : null, Validators.required)
        });
      }

      onSubmitGroup(i: number) {
        const newType = this.objects[i].form.value.name;
        this.objects[i].objects.forEach(object => {
          object.type = newType;
        });
        this.objects[i].editable = false;
        this.mode = 'none';
        if(this.objects[i].objects.length > 0) {
          this.store.updateListables(this.processObjects());
        }
      }

      processObjects(): T[] {
        if(this.objects[0].objects[0].hasType) {
          this.objects.forEach(group => group.objects.forEach(object => object.type = group.form.value.name));
        }
        return Array.prototype.concat.apply([], this.objects.map(x => x.objects)).
          map((object, i) => {
            object.order = i;
            return new this.c(object);
          });
      }

      onEditGroup(i: number) {
        this.objects[i].editable = true; 
        this.mode = 'group';
      }

      onCancelGroup(i: number) {
        if(this.mode == 'create-group') {
          this.objects.splice(this.objects.length-1);
        } else {
          this.objects[i].form.reset();
        }
        this.mode = 'none';
      }
}