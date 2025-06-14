import { HelloController } from '@application/controllers/HelloController';
import { HelloUseCase } from '@application/usecases/HelloUseCase';
import { lambdaHttpAdapter } from '@main/adapters/lambdaHttpAdapter';
import 'reflect-metadata';

const controller = new HelloController(new HelloUseCase());

export const handler = lambdaHttpAdapter(controller);

