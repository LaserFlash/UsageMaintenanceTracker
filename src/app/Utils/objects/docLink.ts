/**
* Object intended to store a url (string)
* and title (string) to display with the url
*/
export class DocLink {
  constructor(
    public url: string,
    public title: string,
    public id: string
  ) { }
}
