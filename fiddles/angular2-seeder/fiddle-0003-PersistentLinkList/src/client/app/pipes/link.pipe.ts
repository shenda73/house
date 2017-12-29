import { Pipe, PipeTransform } from '@angular/core';
import { Link } from '../interfaces/index';

@Pipe({
  name: 'link'
})

export class LinkPipe implements PipeTransform {
  transform(data: Link[], args: string[]): Link[] {
    if (args.length === 1) {
      return data.filter((link: Link) => {
        return link && link.json && link.json !== undefined &&
        link.json.indexOf(args[0]) !== -1 ? true : false;
      });
    } else {
      return data.filter((link: Link) => {
        let rc = false;
        args.forEach((criteria: string) => {
          if (link && link.json && link.json !== undefined && criteria !== undefined &&
              link.json.indexOf(criteria) !== -1) {
              rc = true;
          }
        });
        return rc;
      });
    }
  }
}
