import { Listable } from './model'; 
import { StoreService } from './store.service'; 

export class ListablesComponent<T extends Listable> {

    objects: T[]; 
    edittedId: number;
    mode = 'none';
    c: new (object?: any) => T;

    constructor(
        public store: StoreService
    ) {}

    modeSelect(e: string) {
        if(this.mode == 'sort' && e == 'none') {
          let len = this.objects.length;
          var i; 
          for (i=0; i<len; i++) {
            this.objects[i].order = i; 
          }
          this.store.updateListables(this.objects);
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
}