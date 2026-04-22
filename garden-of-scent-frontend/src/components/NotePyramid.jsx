import React from 'react';

const NotePyramid = ({ top, heart, base }) => {
  return (
    <div className="note-pyramid" style={{ marginTop: '40px' }}>
      <div className="pyramid-tier glass reveal active">
        <p className="tier-label">Top Notes (Immediate)</p>
        <p style={{ fontSize: '1.1rem' }}>{top}</p>
      </div>
      
      <div className="pyramid-tier glass reveal active" style={{ marginLeft: '20px' }}>
        <p className="tier-label">Heart Notes (Character)</p>
        <p style={{ fontSize: '1.1rem' }}>{heart}</p>
      </div>
      
      <div className="pyramid-tier glass reveal active" style={{ marginLeft: '40px' }}>
        <p className="tier-label">Base Notes (Lasting)</p>
        <p style={{ fontSize: '1.1rem' }}>{base}</p>
      </div>
    </div>
  );
};

export default NotePyramid;
