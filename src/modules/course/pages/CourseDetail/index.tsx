import { useMemo, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';
import { type Descendant } from 'slate';

import MyButton from '@/components/common/Button';
import Modal, { ModalRef } from '@/components/common/Modal';
import AppTextEditorV2 from '@/components/common/TextEditorV2';
import ButtonActionCourseDetail from '@/modules/course/components/ButtonActionCourseDetail';

import { useGetCourseBySlug } from '../../apis/getCourseBySlug';
import CourseTransaction from '../../components/CourseTransaction';
import FreeTag from '../../components/FreeTag';
import CourseDetailLayout from './CourseDetailLayout';

const CourseDetailPage = () => {
  const { slug } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  const modalContentRef = useRef<ModalRef>(null);

  const { data } = useGetCourseBySlug(`${slug}`);

  const courseContent = useMemo<Descendant[]>(() => {
    try {
      if (data?.content) return JSON.parse(data?.content);
      return [];
    } catch (error) {
      return [];
    }
  }, [data]);

  return (
    <div className="">
      <CourseDetailLayout data={data} />
      <div className="px-10 py-10">
        <div className="flex gap-4">
          <div className="inline-block border border-gray-200 rounded-[8px] w-[350px] max-h-[200px] overflow-hidden">
            <img src={data?.thumbnailUrl} className="object-cover h-full w-full" alt="asd" />
          </div>
          <div className="border border-gray-200 flex-1 items-start self-start rounded-[8px] overflow-hidden p-4">
            <p className="text-sm-bold">{t`information`}</p>
            <div className="flex mt-4">
              <div className="flex-1">
                <div>
                  <p className="text-gray-500 text-sm-semi-bold">{t`title`}</p>
                  <p className="mt-[4px]">{data?.title}</p>
                </div>
                <div className="mt-4">
                  <p className="text-gray-500 text-sm-semi-bold">{t`description`}</p>
                  <p className="mt-[4px]">{data?.description}</p>
                </div>
              </div>
              <div className="flex-1">
                <div className="">
                  <p className="text-gray-500 text-sm-semi-bold">{t`price`}</p>
                  <p className="mt-[4px]">
                    <FreeTag price={data?.price ?? 0} />
                  </p>
                </div>
                <div className="mt-4">
                  <p className="text-gray-500 text-sm-semi-bold">{t`content`}</p>
                  <p className="mt-[4px]">
                    <MyButton onClick={() => modalContentRef.current?.open()}>
                      {t`content`}
                    </MyButton>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex items-center gap-3">
          <ButtonActionCourseDetail />
          <MyButton onClick={() => navigate(`/chapter?courseId=${data?.id}`)}>
            {t`chapter`}
          </MyButton>
        </div>
        <div className="mt-8">
          <CourseTransaction courseId={data?.id ?? ''} />
        </div>
      </div>
      <Modal ref={modalContentRef} modalClassName="rounded-md">
        <div className="p-6 ">
          <AppTextEditorV2 initialValue={courseContent} readOnly />
        </div>
      </Modal>
    </div>
  );
};

export default CourseDetailPage;
