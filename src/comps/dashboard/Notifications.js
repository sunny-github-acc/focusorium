import React from 'react'
import moment from 'moment'

const Notifications = (props) => {
    const { notifications } = props;
    return (
        <div className="container blue-text lighten-text-2 ">
            <p>
                { notifications && notifications.map(item => {
                    return (
                    <div className="notification" key={item.id}>
                        {item.user} {item.content} {moment(item.time.toDate()).fromNow()}
                        <li className="divider" tabindex="-1"></li>
                    </div>
                )
                })}
                
            </p>
        </div>
    )
}

export default Notifications