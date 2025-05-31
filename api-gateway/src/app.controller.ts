import { Controller, Get, Post, Put, Delete, Request, Body, Param } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { HttpException } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(private readonly httpService: HttpService) {}

  // Proxy to auth-service (port 3001)
  @Post('auth/login')
  async proxyAuthLogin(@Body() body: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://auth-service:3001/auth/login', body)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error proxying to auth-service',
        error.response?.status || 500
      );
    }
  }

  @Post('auth/register')
  async proxyAuthRegister(@Body() body: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://auth-service:3001/auth/register', body)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error proxying to auth-service',
        error.response?.status || 500
      );
    }
  }

  @Post('auth/refresh')
  async proxyAuthRefresh(@Body() body: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://auth-service:3001/auth/refresh', body)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error proxying to auth-service',
        error.response?.status || 500
      );
    }
  }

  @Post('auth/logout')
  async proxyAuthLogout(@Body() body: any) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://auth-service:3001/auth/logout', body)
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error proxying to auth-service',
        error.response?.status || 500
      );
    }
  }

  // Proxy to course-service (port 3000)
  @Get('courses')
  async proxyCoursesGetAll(@Request() req) {
    try {
      const response = await firstValueFrom(
        this.httpService.get('http://course-service:3000/courses', {
          headers: req.headers,
        })
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error proxying to course-service',
        error.response?.status || 500
      );
    }
  }

  @Get('courses/:id')
  async proxyCourseGet(@Param('id') id: string, @Request() req) {
    try {
      const response = await firstValueFrom(
        this.httpService.get(`http://course-service:3000/courses/${id}`, {
          headers: req.headers,
        })
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error proxying to course-service',
        error.response?.status || 500
      );
    }
  }

  @Post('courses')
  async proxyCourseCreate(@Body() body: any, @Request() req) {
    try {
      const response = await firstValueFrom(
        this.httpService.post('http://course-service:3000/courses', body, {
          headers: req.headers,
        })
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error proxying to course-service',
        error.response?.status || 500
      );
    }
  }

  @Put('courses/:id')
  async proxyCourseUpdate(@Param('id') id: string, @Body() body: any, @Request() req) {
    try {
      const response = await firstValueFrom(
        this.httpService.put(`http://course-service:3000/courses/${id}`, body, {
          headers: req.headers,
        })
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error proxying to course-service',
        error.response?.status || 500
      );
    }
  }

  @Delete('courses/:id')
  async proxyCourseDelete(@Param('id') id: string, @Request() req) {
    try {
      const response = await firstValueFrom(
        this.httpService.delete(`http://course-service:3000/courses/${id}`, {
          headers: req.headers,
        })
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        error.response?.data || 'Error proxying to course-service',
        error.response?.status || 500
      );
    }
  }
}