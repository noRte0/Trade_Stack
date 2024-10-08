import Image from "next/image";
import Link from "next/link";

const Card = ({ key, item }) => {

    return (
        <div key={key} className="mb-12 flex items-center gap-12 md:gap-8 lg:gap-12 bg-clip-border rounded-xl bg-white shadow-md ">
            
            {(item.photo || "https://as1.ftcdn.net/v2/jpg/03/16/01/06/1000_F_316010690_Wm9W2fSc2KTVvuyuJDZSb7xDNZ77q0qC.jpg") && ( // ตรวจสอบว่ามี item.photo หรือไม่ ถ้าไม่มีให้ใช้ภาพตัวอย่างแทน
                <div className="relative flex-1 h-[350px] hidden md:block"> 
                    <Image
                        src={item.photo || "https://as1.ftcdn.net/v2/jpg/03/16/01/06/1000_F_316010690_Wm9W2fSc2KTVvuyuJDZSb7xDNZ77q0qC.jpg"} // ถ้าไม่มี item.photo ให้ใช้ URL ของภาพตัวอย่างแทน
                        alt="Sample Image" // ใส่คำอธิบาย alt เพื่อช่วยเรื่องการเข้าถึงและ SEO
                        fill // ใช้ fill layout ของ Next.js Image component ซึ่งจะทำให้ภาพครอบคลุมขนาดของ Container อย่างเต็มที่
                        className="object-cover rounded-xl" // ใช้ object-cover เพื่อให้ภาพถูกครอบขยายตามอัตราส่วนที่เหมาะสม และ rounded-xl เพื่อให้มุมของภาพโค้ง
                    />
                </div>
            )}


            <div className="flex-1 flex flex-col gap-6">
                <div className="text-gray-500">
                    <span className="text-gray-500">
                        {item.createdAt.substring(0, 10)}
                    </span>
                </div>
                <Link href={`/singlepost/${item.slug}`}>
                    <h1 className="text-xl font-bold text-black">{item.product}</h1>
                </Link>
                <div
                    className="text-base font-light text-gray-700 line-clamp-3" // ใช้ Tailwind CSS เพื่อจัดการกับขนาดฟอนต์ น้ำหนัก ความสูงของบรรทัด และการจัดการการแสดงข้อความให้แสดงแค่ 3 บรรทัด
                    dangerouslySetInnerHTML={{ // ใช้ dangerouslySetInnerHTML เพื่อแสดง HTML ดิบ ๆ จากข้อมูลภายใน item.about
                        __html: // กำหนดค่า HTML ที่จะถูกแสดง
                            item?.about.length > 100 // ตรวจสอบว่าข้อความมีความยาวเกิน 100 ตัวอักษรหรือไม่
                                ? `${item.about.substring(0, 100)}...` // ถ้าเกิน 100 ตัวอักษร ตัดข้อความเหลือแค่ 100 ตัวอักษรแรกแล้วเพิ่ม ... ต่อท้าย
                                : item.about, // ถ้าไม่เกิน 100 ตัวอักษร ให้แสดงข้อความทั้งหมดตามเดิม
                    }}
                />
                <Link href={`/singlepost/${item.slug}`} className="text-crimson border-b border-crimson w-max pb-4 hover:text-red-700 transition ">
                    Read More
                </Link>
            </div>
        </div>


    );
};

export default Card;
