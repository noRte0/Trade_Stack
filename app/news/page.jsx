import StockCalendar from '../components/StockCalendar';

export default function Home() {
  return (
    <div className='pl-5 pr-5 z-49'>     
      <div>
        Economic Calendar 
      </div>
      <StockCalendar />
    </div>
  );
}
