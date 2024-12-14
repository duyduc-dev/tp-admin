import { Bolt, Trash, Wrench } from 'lucide-react';
import { useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router-dom';

import MyButton, { ButtonType } from '@/components/common/Button';
import Modal, { ModalRef } from '@/components/common/Modal';
import Popover, { PopoverRef } from '@/components/common/Popover';
import { AppRoutes } from '@/constants';
import queryClient from '@/libs/react-query.ts';
import { useDeleteCourseById } from '@/modules/course/apis/deleteCourseById.ts';
import { getQueryClientCourseBySlugKey } from '@/modules/course/apis/getCourseBySlug.ts';
import { CourseDetail } from '@/types/course.ts';

const ButtonActionCourseDetail = () => {
  const { t } = useTranslation();
  const popoverRef = useRef<PopoverRef>(null);
  const modalRef = useRef<ModalRef>(null);
  const { slug = '' } = useParams();
  const navigate = useNavigate();

  const courseDetail = queryClient.getQueryData<CourseDetail>(getQueryClientCourseBySlugKey(slug));

  const { mutateAsync, isPending } = useDeleteCourseById({});

  const handleDeleteCourse = async () => {
    if (courseDetail) {
      await mutateAsync(courseDetail.id);
      modalRef.current?.close();
      navigate(AppRoutes.COURSES.INDEX);
    }
  };

  return (
    <>
      <Popover
        onClickOutside={() => popoverRef.current?.close()}
        ref={popoverRef}
        render={() => (
          <div className="shadow-[rgba(149,157,165,0.2)_0px_8px_24px] bg-white py-3 flex flex-col gap-2 px-3">
            <button className="flex items-center gap-2 text-primary-500 px-3 py-2 hover:bg-black/10 transition-all rounded-[4px]">
              <Wrench size={20} />
              <span className="text-[15px]">{t`edit`}</span>
            </button>
            <button
              onClick={() => modalRef.current?.open()}
              className="flex items-center gap-2 text-error-500 px-3 py-2 hover:bg-black/10 transition-all rounded-[4px]"
            >
              <Trash size={20} />
              <span className="text-[15px]">{t`delete`}</span>
            </button>
          </div>
        )}
      >
        <MyButton
          onClick={() => popoverRef.current?.open()}
          buttonType={ButtonType.PRIMARY_ORANGE}
          leftIcon={<Bolt size={20} />}
        >
          {t`actions`}
        </MyButton>
      </Popover>
      <Modal ref={modalRef} modalClassName="rounded-[6px] max-w-[500px]">
        <div className="p-4">
          <div className="mb-3">
            <h3 className="text-[18px] text-lg-bold text-error-500 mb-2">{t`confirmDeletion`}</h3>
            <p className="text-[15px]">{t`confirmDeletionCourseDesc`}</p>
          </div>
          {courseDetail && (
            <div className="flex gap-2 border border-neutral-200 p-2 rounded-[6px]">
              <img
                src={courseDetail.thumbnailUrl}
                alt=""
                className="rounded-[6px] w-[200px] object-cover"
              />
              <div>
                <p className="text-[14px] text-sm-bold font-[800] inter-bold">
                  {courseDetail.title}
                </p>
                <p className="text-[14px] line-clamp-3 mt-2">{courseDetail.description}</p>
              </div>
            </div>
          )}
          <div className="flex items-center gap-2 justify-end mt-4">
            <MyButton
              disabled={isPending}
              buttonType={ButtonType.THIRD}
              onClick={() => modalRef.current?.close()}
            >
              {t`cancel`}
            </MyButton>
            <MyButton
              disabled={isPending}
              buttonType={ButtonType.ERROR}
              onClick={handleDeleteCourse}
            >
              {t`confirm`}
            </MyButton>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default ButtonActionCourseDetail;
