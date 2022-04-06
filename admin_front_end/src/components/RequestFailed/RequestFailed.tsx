import * as React from 'react';

export interface IRequestFailedProps {
}

export default function RequestFailed (props: IRequestFailedProps) {
    return (
        <div className='request-failed'>
            <div>report</div>
            <div>
                Yêu cầu thất bại
            </div>
        </div>
    );
}
