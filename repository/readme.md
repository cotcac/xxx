# what is this?
Repository separate the data access logic from the Controller. A Repository is simply an Interface between the Data Model and the Controller.

## Programing logic

Controller will just comunicate with the router and return.

It will no longer talk to the Models, repository will do.

Repository is just a middleware that inject the result to the req object
then return next.

The controller will just get data from REQ object then send json.
ex:
```
 router.delete('/:id', inject('deleteUser'), this.delete);
```