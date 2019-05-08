import * as React from 'react';

class TableHeading extends React.Component<any, any>{
  render(){
    return(
      <thead>
        <tr>
          <th scope="col">Shopname</th>
          <th scope="col">Address</th>
          <th scope="col">Contact #</th>
          <th scope="col">Status</th>
          <th scope="col">Options</th>
        </tr>
      </thead>
    )
  }
}
export default TableHeading;