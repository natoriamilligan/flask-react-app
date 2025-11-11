import { useState } from 'react';
import { Container, ListGroup } from 'react-bootstrap';

function Transactions() {
     return (
        <>
            <ListGroup>
                <ListGroup.Item className="trans-list-item">
                    <div className="list-item-top">11/34/25</div>
                    <div className="list-item-bottom">
                        <div>Deposit</div>
                        <div>+$500</div>
                    </div>
                </ListGroup.Item>
            </ListGroup>
        </>
     )
}
export default Transactions