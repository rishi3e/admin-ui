import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe',
})
export class SearchPipePipe implements PipeTransform {
  transform(items: any[], searchTerm: string): any {
    if (!items) {
      return [];
    }

    if (!searchTerm) {
      return items;
    }

    searchTerm = searchTerm.toLocaleLowerCase();
    return items.filter((data) => {
      // console.log(data);
      return (
        data.name.toLocaleLowerCase().includes(searchTerm) |
        data.email.toLocaleLowerCase().includes(searchTerm) |
        data.role.toLocaleLowerCase().includes(searchTerm)
      );
    });
  }
}
